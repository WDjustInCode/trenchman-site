import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const client = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: "2025-07",
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
});

export interface ShopifyProduct {
  id: string;
  title: string;
  priceRange: { minVariantPrice: { amount: string } };
  featuredImage: { url: string; altText: string | null } | null;
  variants: { nodes: Array<{ id: string }> };
  tags: string[];
  metafields: Array<{ key: string; value: string } | null>;
}

const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      nodes {
        id
        title
        tags
        priceRange {
          minVariantPrice {
            amount
          }
        }
        featuredImage {
          url
          altText
        }
        variants(first: 1) {
          nodes {
            id
          }
        }
      }
    }
  }
`;

const COLLECTION_QUERY = `
  query getCollection($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      products(first: $first) {
        nodes {
          id
          title
          tags
          priceRange {
            minVariantPrice {
              amount
            }
          }
          featuredImage {
            url
            altText
          }
          variants(first: 1) {
            nodes {
              id
            }
          }
          metafields(identifiers: [
            { namespace: "custom", key: "date" }
            { namespace: "custom", key: "location" }
            { namespace: "custom", key: "age_group" }
            { namespace: "custom", key: "spots_available" }
          ]) {
            key
            value
          }
        }
      }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($variantId: ID!, $quantity: Int!) {
    cartCreate(input: { lines: [{ merchandiseId: $variantId, quantity: $quantity }] }) {
      cart {
        checkoutUrl
      }
    }
  }
`;

export async function getProducts(first = 20): Promise<ShopifyProduct[]> {
  const { data, errors } = await client.request(PRODUCTS_QUERY, {
    variables: { first },
  });
  if (errors) throw new Error(errors.message);
  return data.products.nodes;
}

export async function getCollectionProducts(handle: string, first = 20): Promise<ShopifyProduct[]> {
  const { data, errors } = await client.request(COLLECTION_QUERY, {
    variables: { handle, first },
  });
  if (errors) throw new Error(errors.message);
  return data.collection?.products.nodes ?? [];
}

export async function createCheckout(variantId: string): Promise<string> {
  const { data, errors } = await client.request(CART_CREATE_MUTATION, {
    variables: { variantId, quantity: 1 },
  });
  if (errors) throw new Error(errors.message);
  return data.cartCreate.cart.checkoutUrl;
}
