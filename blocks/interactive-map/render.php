<?php
/**
 * Server-side rendering for the Interactive Map block.
 *
 * @package Another_Interactive_Map
 * @since 1.0.0
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 */

use The_Another\Plugin\Interactive_Map\Map;

$svg_content = Map::get_svg_content();

if ( empty( $svg_content ) ) {
	return;
}

// Extract attributes with defaults.
$fill_color       = $attributes['fillColor'] ?? '#EBECED';
$fill_color_hover = $attributes['fillColorHover'] ?? '#C8D6E5';
$stroke_color     = $attributes['strokeColor'] ?? '#FFFFFF';
$stroke_color_hover = $attributes['strokeColorHover'] ?? '#FFFFFF';
$text_color         = $attributes['textColor'] ?? '#000000';
$text_color_hover   = $attributes['textColorHover'] ?? '#000000';
$click_action       = $attributes['clickAction'] ?? 'callback';

// Build CSS custom properties for inline styles.
$inline_styles = sprintf(
	'--map-fill:%s;--map-fill-hover:%s;--map-stroke:%s;--map-stroke-hover:%s;--map-text:%s;--map-text-hover:%s;',
	esc_attr( $fill_color ),
	esc_attr( $fill_color_hover ),
	esc_attr( $stroke_color ),
	esc_attr( $stroke_color_hover ),
	esc_attr( $text_color ),
	esc_attr( $text_color_hover )
);

// Build data attributes for view.js.
$data_attrs = sprintf( 'data-click-action="%s"', esc_attr( $click_action ) );

if ( 'callback' === $click_action ) {
	$callback_fn = $attributes['callbackFunctionName'] ?? 'onMapStateClick';
	$data_attrs .= sprintf( ' data-callback-fn="%s"', esc_attr( $callback_fn ) );
} else {
	// Webhook mode.
	$webhook_is_external = $attributes['webhookIsExternal'] ?? false;
	$webhook_base_url    = $attributes['webhookBaseUrl'] ?? '';
	$webhook_path        = $attributes['webhookPath'] ?? '/states/';
	$webhook_format      = $attributes['webhookFormat'] ?? 'state-slug';

	// Determine base URL.
	if ( $webhook_is_external && ! empty( $webhook_base_url ) ) {
		$base = $webhook_base_url;
	} else {
		$base = home_url();
	}

	// Combine base URL + webhook path.
	$base = rtrim( $base, '/' );
	$path = '/' . ltrim( $webhook_path, '/' );
	$full_base = $base . $path;

	$data_attrs .= sprintf( ' data-webhook-base="%s"', esc_attr( $full_base ) );
	$data_attrs .= sprintf( ' data-webhook-format="%s"', esc_attr( $webhook_format ) );
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'style' => $inline_styles,
	)
);
?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> <?php echo $data_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="another-interactive-map__svg-container">
		<?php echo $svg_content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- SVG from plugin asset. ?>
	</div>
</div>
