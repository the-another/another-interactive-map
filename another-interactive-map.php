<?php
/**
 * Plugin Name: Another Interactive Map
 * Plugin URI: https://theanother.org/plugin/interactive-map/
 * Description: Shows interactive map of the US and Canada with options how to proceed with link click.
 * Version: 1.0.0
 * Author: The Another
 * Author URI: https://theanother.org
 * Requires at least: 6.9
 * Requires PHP: 8.3
 * Text Domain: another-interactive-map
 * Domain Path: /languages
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * GitHub Plugin URI: https://github.com/the-another/another-interactive-map
 * Primary Branch: master
 * Release Asset: true
 *
 * @package Another_Interactive_Map
 * @since 1.0.0
 */

namespace The_Another\Plugin\Interactive_Map;

// Exit if accessed directly.
use Exception;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define plugin constants.
define( 'ANOTHER_INTERACTIVE_MAP_VERSION', '1.0.0' );
define( 'ANOTHER_INTERACTIVE_MAP_FILE', __FILE__ );
define( 'ANOTHER_INTERACTIVE_MAP_DIR', plugin_dir_path( __FILE__ ) );
define( 'ANOTHER_INTERACTIVE_MAP_URL', plugin_dir_url( __FILE__ ) );
define( 'ANOTHER_INTERACTIVE_MAP_BASENAME', plugin_basename( __FILE__ ) );

// Require Composer autoloader.
require_once ANOTHER_INTERACTIVE_MAP_DIR . 'vendor/autoload.php';

// Initialize plugin on plugins_loaded.
add_action(
	'plugins_loaded',
	function () {
		try {
			Interactive_Map::get_instance()->start();
		} catch ( Exception $e ) {
			// Use plain string for error title to avoid translation issues during fatal errors.
			wp_die(
				esc_html( $e->getMessage() ),
				'Another Interactive Map Error',
				array( 'response' => 500 )
			);
		}
	}
);
