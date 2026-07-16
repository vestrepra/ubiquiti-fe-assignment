import { QueryClient } from '@tanstack/react-query';

// Since we are using a static data source, we can keep the data stale for long.
const STALE_TIME = 1000 * 60 * 5; // 5 minutes
const GC_TIME = 1000 * 60 * 10; // 10 minutes

export const createQueryClient = (): QueryClient => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: STALE_TIME,
                gcTime: GC_TIME,
                retry: 1,
            },
        },
    });
};
