import { useSyncExternalStore } from 'react';

const COLUMN_QUERIES = [
    { query: '(min-width: 1280px)', columns: 6 },
    { query: '(min-width: 1024px)', columns: 4 },
    { query: '(min-width: 640px)', columns: 3 },
] as const;

function getColumnCount() {
    for (const { query, columns } of COLUMN_QUERIES) {
        if (window.matchMedia(query).matches) {
            return columns;
        }
    }

    return 2;
}

function subscribe(onStoreChange: () => void) {
    const mediaQueries = COLUMN_QUERIES.map(({ query }) =>
        window.matchMedia(query),
    );

    mediaQueries.forEach((mediaQuery) => {
        mediaQuery.addEventListener('change', onStoreChange);
    });

    return () => {
        mediaQueries.forEach((mediaQuery) => {
            mediaQuery.removeEventListener('change', onStoreChange);
        });
    };
}

export function useCatalogGridColumns() {
    return useSyncExternalStore(subscribe, getColumnCount, () => 2);
}
