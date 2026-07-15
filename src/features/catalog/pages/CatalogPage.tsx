import { useMemo } from 'react';
import { useProducts } from '@/shared/api/products';
import { useCatalogFilters } from '@/features/catalog/hooks/useCatalogFilters';
import { filterDevices } from '@/features/catalog/lib/filter-devices';
import { PageErrorFallback } from '@/shared/error-boundary/PageErrorFallback';
import { Toolbar } from '@/shared/layout/toolbar/Toolbar';
import { CatalogViewTable } from '../components/catalog-view-table/CatalogViewTable';
import { CatalogViewGrid } from '../components/catalog-view-grid/CatalogViewGrid';
import { CatalogTools } from '../components/catalog-tools/CatalogTools';
import { CatalogSearch } from '../components/catalog-tools/CatalogSearch';

export const CatalogPage = () => {
    const { data: devices = [], isPending, isError, refetch } = useProducts();
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
                {isError ? (
                    <PageErrorFallback
                        title="Could not load products."
                        message="Something went wrong while fetching the catalog."
                        primaryLabel="Try again"
                        onPrimary={() => refetch()}
                    />
                ) : view === 'table' ? (
                    <CatalogViewTable
                        devices={filteredDevices}
                        isLoading={isPending}
                    />
                ) : (
                    <CatalogViewGrid
                        devices={filteredDevices}
                        isLoading={isPending}
                    />
                )}
                {!isPending && !isError && filteredDevices.length === 0 && (
                        <div className="flex items-center justify-center mt-10">
                            <p className="text-sm text-foreground">
                                No devices found.
                            </p>
                        </div>
                    )}
            </div>
        </>
    );
};
