# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Another Interactive Map is a WordPress Gutenberg block plugin that renders an interactive SVG map of the United States and Canada (50 states + 13 provinces/territories). Users configure colors, hover effects, and click actions from the block editor. Two click modes: **Callback** (calls a global JS function with region data) and **Webhook** (navigates to a URL built from the region).

**Requirements:** WordPress 6.9+, PHP 8.3+

## Development Commands

### PHP (via Docker — recommended)

All `make` commands build a Docker image first, then run inside containers for consistent PHP 8.3 environment.

```bash
make install-dev     # Install composer deps (with dev)
make build           # Mozart namespace prefixing
make lint            # PHPCS (isolated Docker container)
make format          # Auto-fix code style (phpcbf)
make test            # PHPUnit tests (isolated Docker container)
make all             # install-dev + build + lint + test
```

### PHP (direct, if local PHP/Composer available)

```bash
composer install --dev
composer test                                  # Run all tests
./vendor/bin/phpunit                           # Same as above
./vendor/bin/phpunit tests/MapTest.php         # Single test file
./vendor/bin/phpunit --filter test_method_name # Single test method
composer phpcs                                 # Lint
composer phpcbf                                # Auto-fix
```

### JavaScript / Gutenberg Blocks

```bash
npm run build        # Production build (editor + view scripts)
npm start            # Watch mode
npm run lint:js      # Lint JS files
npm run lint:css     # Lint CSS files
npm run format       # Format JS files
```

## Architecture

### Plugin Initialization

`another-interactive-map.php` defines constants, loads Composer autoloader, and hooks into `plugins_loaded` to call `Interactive_Map::get_instance()->start()`. The `start()` method registers `Blocks::register` on the `init` action.

### PHP Classes (all in `includes/`, namespace `The_Another\Plugin\Interactive_Map`)

- **`Interactive_Map`** — Singleton entry point. Wires up block registration on `init`.
- **`Blocks`** — Static class. Scans `blocks/` directory for subdirectories with `block.json`, calls `register_block_type()` on each. Registers a custom block category ("Another Interactive Map").
- **`Map`** — Static utility. Reads the SVG from `assets/maps/north-america-map.svg` and strips inline `fill`/`stroke`/`stroke-width` attributes from state/province paths so CSS custom properties can control appearance.

### Gutenberg Block (`blocks/interactive-map/`)

Single block with two separate webpack entry points (configured in `webpack.config.js`):

- **`editor.js`** — React component with `ServerSideRender` preview, color picker panels, and click-action settings. Built with standard `@wordpress/scripts` config.
- **`view.js`** — Frontend-only IIFE script (no Interactivity API). Handles hover color changes on text labels and click events (callback or webhook). Built with `splitChunks: false` and `runtimeChunk: false` so it outputs a standalone file.
- **`render.php`** — Server-side rendering. Gets SVG content via `Map::get_svg_content()`, builds CSS custom properties for colors, and sets `data-*` attributes for the view script.

Block attributes include 6 color settings (fill, stroke, text — each with hover variant), click action type, callback function name, and webhook URL configuration.

### Map Data (`blocks/interactive-map/src/north-america-map-data.js`)

Contains `MAP_DATA` object with 63 region entries keyed by SVG ID (e.g., `US-CA`, `CA-ON`). Each entry has `code`, `name`, `country`, and `slug`. Exports `getRegionData()` and `formatWebhookUrl()` helpers.

### Build Output

Compiled assets go to `dist/blocks/interactive-map/` — referenced by `block.json`.

## Coding Standards

- **PHP:** WordPress Coding Standards + Automattic VIP Coding Standards (`.phpcs.xml.dist`)
- **JS/CSS:** `@wordpress/scripts` linting
- **Namespace:** `The_Another\Plugin\Interactive_Map`
- **Test namespace:** `The_Another\Plugin\Interactive_Map\Tests`

## Testing

PHPUnit 11 with Brain\Monkey for WordPress function mocking and Mockery for object mocking. Tests run without WordPress loaded. Bootstrap in `tests/bootstrap.php` defines required WordPress constants.

### E2E Tests (Playwright + WordPress Playground)

```bash
npm run test:e2e        # Run all e2e tests (starts wp-now automatically)
npm run test:e2e:ui     # Run with Playwright UI mode
npx playwright install  # Install browser binaries (first time)
```

## Mozart

Dependencies listed in `extra.mozart.packages` in `composer.json` get namespace-prefixed to `The_Another\Plugin\Interactive_Map\Dependencies\` and placed in `/dependencies/`. Currently no packages are configured for Mozart prefixing.