/**
 * Webpack Configuration for Another Interactive Map Blocks
 *
 * Uses @wordpress/scripts default configuration with custom entry points.
 * View scripts are output as standard IIFE (no Interactivity API).
 *
 * @package Another_Interactive_Map
 */

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

const editorEntries = {
	'interactive-map/editor': path.resolve( __dirname, 'blocks/interactive-map/src/editor.js' ),
};

const viewEntries = {
	'interactive-map/view': path.resolve( __dirname, 'blocks/interactive-map/src/view.js' ),
};

// Editor config - standard @wordpress/scripts config.
const editorConfig = {
	...defaultConfig,
	name: 'editor',
	entry: editorEntries,
	output: {
		...defaultConfig.output,
		path: path.resolve( __dirname, 'dist/blocks' ),
		clean: false,
	},
};

// View config - standard IIFE output (no ES modules needed).
const viewConfig = {
	...defaultConfig,
	name: 'view',
	entry: viewEntries,
	output: {
		...defaultConfig.output,
		path: path.resolve( __dirname, 'dist/blocks' ),
		filename: '[name].js',
		clean: false,
	},
	optimization: {
		...defaultConfig.optimization,
		splitChunks: false,
		runtimeChunk: false,
	},
};

module.exports = [ editorConfig, viewConfig ];
