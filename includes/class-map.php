<?php
/**
 * Interactive Map Main Class
 *
 * Main plugin class that acts as a singleton container for dependencies.
 *
 * @package Another_Interactive_Map
 * @since 1.0.0
 */

namespace The_Another\Plugin\Interactive_Map;

use Exception;

/**
 * Class Map
 *
 * Provides static utility methods for reading and processing the SVG map.
 */
class Map {

	/**
	 * Get the SVG map file content.
	 *
	 * @return string SVG content or empty string on failure.
	 */
	public static function get_svg_content(): string {
		$svg_path = ANOTHER_INTERACTIVE_MAP_DIR . 'assets/maps/north-america-map.svg';

		if ( ! file_exists( $svg_path ) ) {
			return '';
		}

		$content = file_get_contents( $svg_path ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents, WordPressVIPMinimum.Performance.FetchingRemoteData.FileGetContentsUnknown -- local file, not remote

		if ( false === $content ) {
			return '';
		}

		// Strip inline fill, stroke, and stroke-width attributes from state/province
		// paths so CSS custom properties can control their appearance.
		$content = preg_replace(
			'/(<path\s+id="(?:US|CA)-[A-Z]{2}")\s+fill="[^"]*"\s+stroke="[^"]*"\s+stroke-width="[^"]*"/',
			'$1',
			$content
		);

		return $content;
	}
}
