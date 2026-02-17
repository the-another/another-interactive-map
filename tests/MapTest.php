<?php
/**
 * Tests for the Map SVG utility class.
 *
 * @package Another_Interactive_Map
 */

namespace The_Another\Plugin\Interactive_Map\Tests;

use Brain\Monkey;
use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use The_Another\Plugin\Interactive_Map\Map;

#[CoversClass( Map::class )]
class MapTest extends TestCase {

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
	public function get_svg_content_returns_string(): void {
		$content = Map::get_svg_content();

		$this->assertIsString( $content );
	}

	#[Test]
	public function get_svg_content_returns_svg_markup(): void {
		$content = Map::get_svg_content();

		$this->assertNotEmpty( $content );
		$this->assertStringContainsString( '<svg', $content );
	}

	#[Test]
	public function get_svg_content_contains_us_state_paths(): void {
		$content = Map::get_svg_content();

		$this->assertStringContainsString( 'id="US-CA"', $content );
		$this->assertStringContainsString( 'id="US-TX"', $content );
		$this->assertStringContainsString( 'id="US-NY"', $content );
	}

	#[Test]
	public function get_svg_content_contains_canadian_province_paths(): void {
		$content = Map::get_svg_content();

		$this->assertStringContainsString( 'id="CA-ON"', $content );
		$this->assertStringContainsString( 'id="CA-BC"', $content );
	}

	#[Test]
	public function get_svg_content_strips_inline_fill_attributes(): void {
		$content = Map::get_svg_content();

		// State/province paths should NOT have inline fill attributes.
		$this->assertDoesNotMatchRegularExpression(
			'/<path\s+id="(?:US|CA)-[A-Z]{2}"\s+fill="/',
			$content
		);
	}

	#[Test]
	public function get_svg_content_strips_inline_stroke_and_stroke_width_attributes(): void {
		$content = Map::get_svg_content();

		// The combined fill+stroke+stroke-width pattern should be stripped from state/province paths.
		$this->assertDoesNotMatchRegularExpression(
			'/<path\s+id="(?:US|CA)-[A-Z]{2}"\s+fill="[^"]*"\s+stroke="[^"]*"\s+stroke-width="[^"]*"/',
			$content
		);
	}
}