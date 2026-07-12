import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from './products.api';

// We are fetching a full json, so we reuse the queryKey between queries.
export const useProducts = () => {
    return useQuery({
        queryKey: ['all-products'],
        queryFn: fetchProducts,
        select: (data) => data.devices,
    });
};

export const useProduct = (deviceId: string | undefined) => {
    return useQuery({
        queryKey: ['all-products'],
        queryFn: fetchProducts,
        enabled: Boolean(deviceId),
        select: (data) => data.devices.find((d) => d.id === deviceId),
    });
};
