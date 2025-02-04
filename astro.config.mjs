// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://shopify-astro-headless-storefront.netlify.app',
	base: './',
	output: 'static',
	srcDir: './src',
	publicDir: './public',
	outDir: './dist',
	cacheDir: './cache',
	compressHTML: false,
	build: {
		format: 'directory',
		assets: 'dist',
		inlineStylesheets: 'always'
	},
	image: {
	  remotePatterns: [{}],
	  domains: []
	},
	integrations: []
});