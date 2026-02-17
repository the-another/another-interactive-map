# Another Interactive Map

A WordPress Gutenberg block that renders an interactive SVG map of the United States and Canada (50 states + 13 provinces/territories). Users can configure colors, hover effects, and click actions directly from the block editor.

## Requirements

- WordPress 6.9+
- PHP 8.3+

## Features

- **Inline SVG rendering** — no iframes, no external requests
- **Theme-aware color picker** — fill, stroke, and text colors with hover variants, using the standard WordPress palette UI
- **Two click-action modes:**
  - **Callback** — calls a global `window` function with region data
  - **Webhook** — navigates to a URL built from the region (slug, code, or country-prefixed)
- **Responsive** — SVG scales to container width
- **Accessible labels** — state/province abbreviations rendered as SVG text with configurable colors

## Usage

1. In the block editor, add the **Interactive Map** block (under the "Another Interactive Map" category).
2. Open the sidebar and configure:
   - **Color Settings** — Fill, Fill (Hover), Stroke, Stroke (Hover), Text, Text (Hover)
   - **Click Action** — Callback or Webhook, with format options
3. Publish or preview the page.

### Callback mode

The default mode calls `window.onMapStateClick(regionData, event)`. Define the function in your theme or a custom script:

```js
window.onMapStateClick = function ( region, event ) {
  console.log( region );
  // { code: 'CA', name: 'California', country: 'US', slug: 'california' }
};
```

The function name is configurable in the block settings.

### Webhook mode

Navigates the browser to a URL composed of a base URL + path + region identifier. Four URL formats are available:

| Format               | Example URL              |
|----------------------|--------------------------|
| `state-slug`         | `/states/california`     |
| `country-state-slug` | `/states/us/california`  |
| `code`               | `/states/CA`             |
| `country-code`       | `/states/US:CA`          |

Check **External website** to use a custom base URL instead of the current site.

## License

GPL v2 or later
