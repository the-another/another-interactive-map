/**
 * Interactive Map — Frontend Interactivity
 *
 * Handles click events on map regions (US states / Canadian provinces).
 *
 * @package Another_Interactive_Map
 */

import { MAP_DATA, getRegionData, formatWebhookUrl } from './north-america-map-data';

/**
 * Walk up from an element to find a <path> with an ID in MAP_DATA.
 *
 * @param {Element}     el        Starting element.
 * @param {HTMLElement} boundary  Stop-element (exclusive).
 * @return {Element|null} The matching path element, or null.
 */
function findStatePath( el, boundary ) {
	let target = el;
	while ( target && target !== boundary ) {
		if ( target.tagName === 'path' && target.id && MAP_DATA[ target.id ] ) {
			return target;
		}
		target = target.parentElement;
	}
	return null;
}

/**
 * Initialize a single map block instance.
 *
 * @param {HTMLElement} block The .wp-block-another-interactive-map wrapper element.
 */
function initMapBlock( block ) {
	const container = block.querySelector( '.another-interactive-map__svg-container' );

	if ( ! container ) {
		return;
	}

	const clickAction = block.dataset.clickAction || 'callback';
	const svg = container.querySelector( 'svg' );
	const abbs = svg ? svg.querySelector( '#abbs' ) : null;

	// Text hover: toggle fill on the matching abbreviation label when a state is hovered.
	if ( abbs ) {
		const textHoverColor = getComputedStyle( block ).getPropertyValue( '--map-text-hover' ).trim();
		const textColor = getComputedStyle( block ).getPropertyValue( '--map-text' ).trim();

		container.addEventListener( 'mouseenter', ( event ) => {
			const path = findStatePath( event.target, container );
			if ( ! path ) {
				return;
			}
			const regionData = getRegionData( path.id );
			if ( ! regionData ) {
				return;
			}
			const textEl = abbs.querySelector( '#' + CSS.escape( regionData.code ) );
			if ( textEl ) {
				textEl.style.fill = textHoverColor;
			}
		}, true );

		container.addEventListener( 'mouseleave', ( event ) => {
			const path = findStatePath( event.target, container );
			if ( ! path ) {
				return;
			}
			const regionData = getRegionData( path.id );
			if ( ! regionData ) {
				return;
			}
			const textEl = abbs.querySelector( '#' + CSS.escape( regionData.code ) );
			if ( textEl ) {
				textEl.style.fill = textColor;
			}
		}, true );
	}

	container.addEventListener( 'click', ( event ) => {
		const path = findStatePath( event.target, container );
		if ( ! path ) {
			return;
		}

		const regionData = getRegionData( path.id );
		if ( ! regionData ) {
			return;
		}

		if ( clickAction === 'callback' ) {
			const fnName = block.dataset.callbackFn || 'onMapStateClick';

			if ( typeof window[ fnName ] === 'function' ) {
				window[ fnName ]( regionData, event );
			}
		} else if ( clickAction === 'webhook' ) {
			const baseUrl = block.dataset.webhookBase || '';
			const format = block.dataset.webhookFormat || 'state-slug';
			window.location.href = formatWebhookUrl( regionData, baseUrl, format );
		}
	} );
}

/**
 * Initialize all map blocks on the page.
 */
function init() {
	const blocks = document.querySelectorAll( '.wp-block-another-interactive-map-interactive-map' );
	blocks.forEach( initMapBlock );
}

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', init );
} else {
	init();
}
