<?php
/**
 * Tests for the Blocks registration class.
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
use The_Another\Plugin\Interactive_Map\Blocks;

#[CoversClass( Blocks::class )]
class BlocksTest extends TestCase {

	use MockeryPHPUnitIntegration;

	protected function setUp(): void {
		parent::setUp();
		Monkey\setUp();
	}

	protected function tearDown(): void {
		Monkey\tearDown();
		parent::tearDown();
	}

	#[Test]
	public function category_slug_constant_is_defined(): void {
		$this->assertSame( 'another-interactive-map', Blocks::CATEGORY_SLUG );
	}

	#[Test]
	public function register_adds_block_category_filter(): void {
		Functions\expect( 'add_filter' )
			->once()
			->with( 'block_categories_all', \Mockery::type( 'array' ), 10, 2 );

		Functions\expect( 'register_block_type' )
			->zeroOrMoreTimes();

		Blocks::register();
	}

	#[Test]
	public function register_registers_block_types_from_blocks_directory(): void {
		Functions\expect( 'add_filter' )->once();

		// The blocks/interactive-map directory with block.json should be registered.
		Functions\expect( 'register_block_type' )
			->once()
			->with( \Mockery::pattern( '/blocks\/interactive-map$/' ) );

		Blocks::register();
	}

	#[Test]
	public function register_block_category_prepends_custom_category(): void {
		Functions\when( '__' )->returnArg();

		$existing = array(
			array(
				'slug'  => 'text',
				'title' => 'Text',
				'icon'  => null,
			),
		);

		$result = Blocks::register_block_category( $existing, null );

		$this->assertCount( 2, $result );
		$this->assertSame( 'another-interactive-map', $result[0]['slug'] );
		$this->assertSame( 'Another Interactive Map', $result[0]['title'] );
		$this->assertSame( 'location-alt', $result[0]['icon'] );
	}

	#[Test]
	public function register_block_category_preserves_existing_categories(): void {
		Functions\when( '__' )->returnArg();

		$existing = array(
			array(
				'slug'  => 'text',
				'title' => 'Text',
				'icon'  => null,
			),
		);

		$result = Blocks::register_block_category( $existing, null );

		$this->assertSame( 'text', $result[1]['slug'] );
	}
}