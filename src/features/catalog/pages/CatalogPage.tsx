import { useState } from 'react';
import { useProducts } from '@/shared/api/products';
import { Toolbar } from '@/shared/layout/toolbar/Toolbar';
import { CatalogViewTable } from '../components/catalog-view-table/CatalogViewTable';
import { CatalogViewGrid } from '../components/catalog-view-grid/CatalogViewGrid';
import { CatalogTools } from '../components/catalog-tools/CatalogTools';
import { CatalogSearch } from '../components/catalog-tools/CatalogSearch';

export const CatalogPage = () => {
    const { data: devices } = useProducts();

    const [view, setView] = useState<'table' | 'grid'>('table');
    return (
        <>
            <Toolbar
                leftSide={<CatalogSearch />}
                rightSide={<CatalogTools view={view} setView={setView} />}
            />
            <div>
                {view === 'table' ? (
                    <CatalogViewTable devices={devices ?? []} />
                ) : (
                    <CatalogViewGrid devices={devices ?? []} />
                )}
            </div>
        </>
    );
};
