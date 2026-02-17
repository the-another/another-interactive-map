<?php
/**
 * Tests for the Interactive_Map singleton class.
 *
 * @package Another_Interactive_Map
 */

namespace The_Another\Plugin\Interactive_Map\Tests;

use Brain\Monkey;
use Brain\Monkey\Functions;
use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use The_Another\Plugin\Interactive_Map\Interactive_Map;

#[CoversClass( Interactive_Map::class )]
class InteractiveMapTest extends TestCase {

	use MockeryPHPUnitIntegration;

	protected function setUp(): void {
		parent::setUp();
		Monkey\setUp();

		// Reset the singleton between tests.
		$reflection = new \ReflectionClass( Interactive_Map::class );
		$instance   = $reflection->getProperty( 'instance' );
		$instance->setValue( null, null );
	}

	protected function tearDown(): void {
		Monkey\tearDown();
		parent::tearDown();
	}

	#[Test]
	public function get_instance_returns_interactive_map_instance(): void {
		$instance = Interactive_Map::get_instance();

		$this->assertInstanceOf( Interactive_Map::class, $instance );
	}

	#[Test]
	public function get_instance_returns_same_instance(): void {
		$first  = Interactive_Map::get_instance();
		$second = Interactive_Map::get_instance();

		$this->assertSame( $first, $second );
	}

	#[Test]
	public function start_registers_init_action(): void {
		Functions\expect( 'add_action' )
			->once()
			->with( 'init', \Mockery::type( 'array' ) );

		Interactive_Map::get_instance()->start();
	}
}