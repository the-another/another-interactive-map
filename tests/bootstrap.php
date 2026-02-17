<?php
/**
 * PHPUnit bootstrap file.
 *
 * @package Another_Interactive_Map
 */

// Composer autoloader (loads Brain\Monkey, Mockery, and plugin classes).
require_once dirname( __DIR__ ) . '/vendor/autoload.php';

// Define WordPress constants used by the plugin.
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', '/tmp/wordpress/' );
}

if ( ! defined( 'ANOTHER_INTERACTIVE_MAP_VERSION' ) ) {
	define( 'ANOTHER_INTERACTIVE_MAP_VERSION', '1.0.0' );
}

if ( ! defined( 'ANOTHER_INTERACTIVE_MAP_FILE' ) ) {
	define( 'ANOTHER_INTERACTIVE_MAP_FILE', dirname( __DIR__ ) . '/another-interactive-map.php' );
}

if ( ! defined( 'ANOTHER_INTERACTIVE_MAP_DIR' ) ) {
	define( 'ANOTHER_INTERACTIVE_MAP_DIR', dirname( __DIR__ ) . '/' );
}

if ( ! defined( 'ANOTHER_INTERACTIVE_MAP_URL' ) ) {
	define( 'ANOTHER_INTERACTIVE_MAP_URL', 'https://example.com/wp-content/plugins/another-interactive-map/' );
}

if ( ! defined( 'ANOTHER_INTERACTIVE_MAP_BASENAME' ) ) {
	define( 'ANOTHER_INTERACTIVE_MAP_BASENAME', 'another-interactive-map/another-interactive-map.php' );
}