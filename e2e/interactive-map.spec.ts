/**
 * E2E tests for the Interactive Map block.
 *
 * Scenarios:
 * 1. Insert block in editor on a "Demo" page.
 * 2. Verify the map renders on the published frontend.
 * 3. Click a state and confirm the callback fires.
 */

import { test, expect } from '@wordpress/e2e-test-utils-playwright';

const BLOCK_NAME = 'another-interactive-map/interactive-map';
const BLOCK_SELECTOR = '.wp-block-another-interactive-map-interactive-map';
const SVG_CONTAINER = '.another-interactive-map__svg-container';

test.describe( 'Interactive Map Block', () => {
	let demoPageUrl: string;

	test( 'can insert block into a new "Demo" page and publish', async ( {
		admin,
		editor,
		page,
	} ) => {
		await admin.createNewPost( { postType: 'page', title: 'Demo' } );

		// Dismiss the "Welcome to the editor" guide if present.
		const dialog = page.getByRole( 'dialog' );
		if ( await dialog.isVisible( { timeout: 2_000 } ).catch( () => false ) ) {
			await page.keyboard.press( 'Escape' );
			await dialog.waitFor( { state: 'hidden' } );
		}

		await editor.insertBlock( { name: BLOCK_NAME } );

		// ServerSideRender loads the SVG via AJAX — wait for it inside
		// the editor canvas (WP 6.x uses an iframe).
		const editorCanvas =
			page.locator( 'iframe[name="editor-canvas"]' ).contentFrame() ??
			page;

		const mapBlock = editorCanvas.locator( BLOCK_SELECTOR );
		await expect( mapBlock ).toBeVisible( { timeout: 15_000 } );

		const svgContainer = mapBlock.locator( SVG_CONTAINER );
		await expect( svgContainer ).toBeVisible();
		await expect( svgContainer.locator( 'svg' ) ).toBeVisible();

		await editor.publishPost();

		// Grab the permalink from the post-publish panel or URL bar.
		const postId = await page.evaluate( () =>
			new URL( window.location.href ).searchParams.get( 'post' )
		);
		demoPageUrl = `/?page_id=${ postId }`;
	} );

	test( 'frontend renders the map with SVG and state paths', async ( {
		page,
	} ) => {
		await page.goto( demoPageUrl );
		await page.waitForLoadState( 'domcontentloaded' );

		const mapWrapper = page.locator( BLOCK_SELECTOR );
		await expect( mapWrapper ).toBeVisible();

		const svgContainer = mapWrapper.locator( SVG_CONTAINER );
		await expect( svgContainer ).toBeVisible();

		const svg = svgContainer.locator( 'svg' );
		await expect( svg ).toBeVisible();

		// Spot-check a few state/province paths.
		await expect( svg.locator( 'path#US-CA' ) ).toBeAttached();
		await expect( svg.locator( 'path#US-TX' ) ).toBeAttached();
		await expect( svg.locator( 'path#CA-ON' ) ).toBeAttached();

		// Default click action should be "callback".
		await expect( mapWrapper ).toHaveAttribute(
			'data-click-action',
			'callback'
		);
		await expect( mapWrapper ).toHaveAttribute(
			'data-callback-fn',
			'onMapStateClick'
		);
	} );

	test( 'clicking a state triggers the callback function', async ( {
		page,
	} ) => {
		await page.goto( demoPageUrl );
		await page.waitForLoadState( 'domcontentloaded' );

		// Inject a test callback that records the received data.
		await page.evaluate( () => {
			( window as any ).__mapClickData = null;
			( window as any ).onMapStateClick = ( regionData: any ) => {
				( window as any ).__mapClickData = regionData;
				const el = document.createElement( 'div' );
				el.id = 'test-click-result';
				el.textContent = JSON.stringify( regionData );
				document.body.appendChild( el );
			};
		} );

		// Click on Texas — a large, reliable target.
		const texas = page.locator( 'path#US-TX' );
		await texas.click( { force: true } );

		// Verify the callback received correct region data.
		const clickResult = await page.evaluate(
			() => ( window as any ).__mapClickData
		);
		expect( clickResult ).toBeTruthy();
		expect( clickResult.code ).toBe( 'TX' );
		expect( clickResult.name ).toBe( 'Texas' );
		expect( clickResult.country ).toBe( 'US' );
		expect( clickResult.slug ).toBe( 'texas' );

		// Verify the DOM was updated.
		const resultEl = page.locator( '#test-click-result' );
		await expect( resultEl ).toBeVisible();
		await expect( resultEl ).toContainText( 'Texas' );
	} );
} );
