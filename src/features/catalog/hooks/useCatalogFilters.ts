import { useSearchParams } from 'react-router-dom';

export type CatalogView = 'table' | 'grid';

const DEFAULT_VIEW: CatalogView = 'table';

export const useCatalogFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const view: CatalogView =
        searchParams.get('view') === 'grid' ? 'grid' : DEFAULT_VIEW;

    const query = searchParams.get('q') ?? '';

    const lines = searchParams.getAll('line');

    const updateParams = (updater: (params: URLSearchParams) => void) => {
        setSearchParams(
            (prev) => {
                const next = new URLSearchParams(prev);
                updater(next);
                return next;
            },
            { replace: true },
        );
    };

    const setView = (nextView: CatalogView) => {
        updateParams((params) => {
            if (nextView === DEFAULT_VIEW) {
                params.delete('view');
            } else {
                params.set('view', nextView);
            }
        });
    };

    const setQuery = (nextQuery: string) => {
        updateParams((params) => {
            const trimmed = nextQuery.trim();
            if (trimmed) {
                params.set('q', trimmed);
            } else {
                params.delete('q');
            }
        });
    };

    const setLines = (nextLines: string[]) => {
        updateParams((params) => {
            params.delete('line');
            nextLines.forEach((line) => params.append('line', line));
        });
    };

    return {
        view,
        setView,
        query,
        setQuery,
        lines,
        setLines,
    };
};
