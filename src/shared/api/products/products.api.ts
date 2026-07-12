import {
    type ProductsResponse,
    ProductsResponseSchema,
} from './products.schema';

const PRODUCTS_URL = 'https://static.ui.com/fingerprint/ui/public.json';

export async function fetchProducts(): Promise<ProductsResponse> {
    const res = await fetch(PRODUCTS_URL);
    if (!res.ok) throw new Error(`Products request failed: ${res.status}`);

    return ProductsResponseSchema.parse(await res.json());
}
