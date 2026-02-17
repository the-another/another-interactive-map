<?php
/**
 * Interactive Map Main Class
 *
 * Main plugin class that acts as a singleton entry point.
 *
 * @package Another_Interactive_Map
 * @since 1.0.0
 */

namespace The_Another\Plugin\Interactive_Map;

/**
 * Class Interactive_Map
 *
 * Main plugin class with singleton pattern.
 */
class Interactive_Map {

	/**
	 * Plugin instance.
	 *
	 * @var Interactive_Map|null
	 */
	private static ?Interactive_Map $instance = null;

	/**
	 * Get the plugin instance.
	 *
	 * @return Interactive_Map Plugin instance.
	 */
	public static function get_instance(): Interactive_Map {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Private constructor to prevent direct instantiation.
	 */
	private function __construct() {
		// Prevent direct instantiation.
	}

	/**
	 * Start the plugin initialization.
	 *
	 * @return void
	 */
	public function start(): void {
		add_action( 'init', array( Blocks::class, 'register' ) );
	}
}
