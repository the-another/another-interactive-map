=== Another Interactive Map ===
Contributors: theanother
Tags: map, interactive map, gutenberg, block, svg
Requires at least: 6.9
Tested up to: 6.9
Requires PHP: 8.3
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

An interactive SVG map of the US and Canada as a Gutenberg block, with configurable colors and click actions.

== Installation ==

1. Upload the `another-interactive-map` folder to the `/wp-content/plugins/` directory, or install directly through the WordPress plugin screen.
2. Activate the plugin through the "Plugins" screen in WordPress.
3. In the block editor, add the **Interactive Map** block from the "Another Interactive Map" category.

== Screenshots ==

1. Interactive map block in the editor with color and click-action settings.
2. Map rendered on the frontend with hover effect.

== Description ==

Another Interactive Map adds a Gutenberg block that renders an interactive inline SVG map covering all 50 US states and 13 Canadian provinces and territories.

**Features:**

* Inline SVG rendering — no iframes or external requests
* Theme-aware color picker for fill, stroke, and text colors (with hover variants)
* Two click-action modes: JavaScript callback or webhook (URL navigation)
* Fully responsive — SVG scales to container width
* Accessible state/province abbreviation labels with configurable colors

== Usage ==

1. In the block editor, add the **Interactive Map** block.
2. Configure colors and click action in the block sidebar.
3. Publish or preview the page.

= Callback Mode =

By default, clicking a region calls `window.onMapStateClick(regionData, event)`. The function name is configurable in the block settings.

Region data format:

    { code: 'CA', name: 'California', country: 'US', slug: 'california' }

= Webhook Mode =

Navigates the browser to a URL composed of a base URL, path, and region identifier. Four URL formats are available:

* **state-slug** — `/states/california`
* **country-state-slug** — `/states/us/california`
* **code** — `/states/CA`
* **country-code** — `/states/US:CA`

Check "External website" to use a custom base URL instead of the current site.

== Frequently Asked Questions ==

= What regions are included? =

All 50 US states plus all 13 Canadian provinces and territories (63 regions total).

= Can I change the colors? =

Yes. The block sidebar provides theme palette and custom color pickers for fill, stroke, and text — each with a separate hover color.

= How do I handle clicks? =

Choose between Callback mode (calls a JavaScript function you define) or Webhook mode (navigates to a configurable URL).

== Changelog ==


= 1.0.0 - 2026-02-17 =
* First stable release.
* Interactive inline SVG map block covering 50 US states and 13 Canadian provinces/territories.
* Theme-aware color picker for fill, stroke, and text colors with hover variants.
* Callback click mode — calls a configurable global JavaScript function with region data.
* Webhook click mode — navigates to a URL built from region slug, code, or country-prefixed format.
* Fully responsive SVG rendering.
