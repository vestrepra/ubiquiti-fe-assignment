import { QueryClient } from '@tanstack/react-query';

// Since we are using a static data source, we can keep the data stale for long.
export const createQueryClient = (): QueryClient => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5,
                gcTime: 1000 * 60 * 10,
                retry: 1,
            },
        },
    });
};
