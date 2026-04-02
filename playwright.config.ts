import { defineConfig } from '@playwright/test';

const PORT = Number( process.env.WP_NOW_PORT ) || 8881;
const BASE_URL = `http://localhost:${ PORT }`;

export default defineConfig( {
	testDir: './e2e',
	fullyParallel: false,
	forbidOnly: !! process.env.CI,
	retries: process.env.CI ? 1 : 0,
	workers: 1,
	reporter: 'list',
	use: {
		baseURL: BASE_URL,
		trace: 'retain-on-failure',
		screenshot: 'only-on-failure',
		video: 'on',
	},
	globalSetup: './e2e/global-setup.ts',
	webServer: {
		command: `npx wp-now start --port=${ PORT } --php=8.3 --reset --skip-browser`,
		url: BASE_URL,
		reuseExistingServer: ! process.env.CI,
		timeout: 60_000,
	},
} );
