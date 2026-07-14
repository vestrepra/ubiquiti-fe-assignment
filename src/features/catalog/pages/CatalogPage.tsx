import { useMemo } from 'react';
import { useProducts } from '@/shared/api/products';
import { useCatalogFilters } from '@/features/catalog/hooks/useCatalogFilters';
import { filterDevices } from '@/features/catalog/lib/filter-devices';
import { Toolbar } from '@/shared/layout/toolbar/Toolbar';
import { CatalogViewTable } from '../components/catalog-view-table/CatalogViewTable';
import { CatalogViewGrid } from '../components/catalog-view-grid/CatalogViewGrid';
import { CatalogTools } from '../components/catalog-tools/CatalogTools';
import { CatalogSearch } from '../components/catalog-tools/CatalogSearch';

export const CatalogPage = () => {
    const { data: devices = [] } = useProducts();
    const { view, setView, query, lines } = useCatalogFilters();

    const filteredDevices = useMemo(
        () => filterDevices(devices, { query, lines }),
        [devices, query, lines],
    );

    return (
        <>
            <Toolbar
                leftSide={<CatalogSearch />}
                rightSide={<CatalogTools view={view} setView={setView} />}
            />
            <div>
                {view === 'table' ? (
                    <CatalogViewTable devices={filteredDevices} />
                ) : (
                    <CatalogViewGrid devices={filteredDevices} />
                )}
                {filteredDevices.length === 0 && (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-sm text-foreground">
                            No devices found
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};
