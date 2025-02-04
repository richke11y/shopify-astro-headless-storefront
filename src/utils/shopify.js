import { createStorefrontApiClient } from '@shopify/storefront-api-client';

import { CollectionsQuery, ProductsQuery } from './graphql.js';

export async function makeShopifyRequestClient() {

	function clientSettings() {

		const settings = {
			storeDomain: import.meta.env.STORE_DOMAIN,
			apiVersion: import.meta.env.API_VERSION,
			publicAccessToken: import.meta.env.PUBLIC_ACCESS_TOKEN
		}

		return settings;

	}

	const client = createStorefrontApiClient(clientSettings());

	return client;

}

export async function shopifyApiFetchRequest(query, variables) {

	const storeDomain = import.meta.env.STORE_DOMAIN;
	const apiVersion = import.meta.env.API_VERSION;
	const publicAccessToken = import.meta.env.PUBLIC_ACCESS_TOKEN;

	const apiUrl = `${storeDomain}/api/${apiVersion}/graphql.json`;
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-Shopify-Storefront-Access-Token": publicAccessToken,
		},
		body: JSON.stringify({ query, variables }),
	}

	const response = await fetch(apiUrl, options);

	if (!response.ok) {
	
		const body = await response.text();
		
		throw new Error(`${response.status} ${body}`);
	
	} else {

		const json = await response.json();
	
		return json.data;

	}

}

export async function getAllCollections() {

	console.log('getAllCollections()');

	// const data = await shopifyApiFetchRequest(CollectionsQuery);

	const client = await makeShopifyRequestClient();
	const { data, errors, extensions } = await client.request(CollectionsQuery);

	const collections = data.collections.edges.map(edge => edge.node);

	return collections;

}

export async function getAllProducts() {

	console.log('getAllProducts()');

	// const data = await shopifyApiFetchRequest(ProductsQuery);

	const client = await makeShopifyRequestClient();
	const { data, errors, extensions } = await client.request(ProductsQuery);

	const products = data.products.edges.map(edge => edge.node);

	return products;

}

export async function getCollectionByHandle() {}

export async function getProductByHandle() {}