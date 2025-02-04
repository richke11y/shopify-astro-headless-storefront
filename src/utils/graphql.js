const COLLECTION_FRAGMENT = `fragment collectionFragment on Collection {
	title
	handle
	products(first: 250) {
		edges {
			node {
				handle
				title
			}
		}
	}
}`;

const PRODUCT_FRAGMENT = `fragment productFragment on Product {
	id
	title
	handle
	description
	variants(first: 10) {
		nodes {
			id
			title
			availableForSale
			quantityAvailable
			price {
				amount
				currencyCode
			}
		}
	}
	featuredImage {
		url
		width
		height
		altText
	}
}`;

export const CollectionsQuery = `query CollectionsQuery {
	collections(first: 250) {
		edges {
			node {
				...collectionFragment
			}
		}
	}
}${COLLECTION_FRAGMENT}`;

export const ProductsQuery = `query ProductsQuery {
	products(first: 250) {
		edges {
			node {
				...productFragment
			}
		}
	}
}${PRODUCT_FRAGMENT}`;