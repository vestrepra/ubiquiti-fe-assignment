import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from './products.api';

// We are fetching a full json, so we reuse the queryKey between queries.
const PRODUCTS_QUERY_KEY = ['all-products'];

export const useProducts = () => {
    return useQuery({
        queryKey: PRODUCTS_QUERY_KEY,
        queryFn: fetchProducts,
        select: (data) => data.devices,
    });
};

export const useProduct = (deviceId: string | undefined) => {
    return useQuery({
        queryKey: PRODUCTS_QUERY_KEY,
        queryFn: fetchProducts,
        enabled: Boolean(deviceId),
        select: (data) => data.devices.find((d) => d.id === deviceId),
    });
};

export const useProductLines = () => {
    return useQuery({
        queryKey: PRODUCTS_QUERY_KEY,
        queryFn: fetchProducts,
        select: (data) => {
            const byId = new Map(data.devices.map((d) => [d.line.id, d.line]));

            return [...byId.values()].sort((a, b) =>
                a.name.localeCompare(b.name),
            );
        },
    });
};
