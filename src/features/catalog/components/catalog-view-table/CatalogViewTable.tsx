import { useWindowVirtualizer } from '@tanstack/react-virtual';
import type { Device } from '@/shared/api/products/products.schema';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';
import { useWindowScrollMargin } from '@/features/catalog/hooks/useWindowScrollMargin';
import { CatalogViewTableColumn } from './CatalogViewTableColumn';
import { CatalogViewTableRow } from './CatalogViewTableRow';

const SKELETON_COUNT = 12;
const ROW_HEIGHT = 32;

export type CatalogViewTableProps = {
    devices: Device[];
    isLoading?: boolean;
};

export const CatalogViewTable = ({
    devices,
    isLoading = false,
}: CatalogViewTableProps) => {
    'use no memo';

    const { ref: listRef, scrollMargin } =
        useWindowScrollMargin<HTMLTableSectionElement>();

    const virtualizer = useWindowVirtualizer({
        count: isLoading ? 0 : devices.length,
        estimateSize: () => ROW_HEIGHT,
        overscan: 8,
        scrollMargin,
    });

    const virtualRows = virtualizer.getVirtualItems();
    const paddingTop =
        virtualRows.length > 0 ? virtualRows[0].start - scrollMargin : 0;
    const paddingBottom =
        virtualRows.length > 0
            ? virtualizer.getTotalSize() -
              (virtualRows[virtualRows.length - 1].end - scrollMargin)
            : 0;

    return (
        <table
            aria-busy={isLoading}
            aria-label={isLoading ? 'Loading products' : undefined}
            className="w-full table-fixed border-separate border-spacing-0"
        >
            <thead className="sticky h-8 min-h-8 top-28.5 z-40 bg-surface supports-backdrop-filter:bg-surface/95">
                <tr>
                    <CatalogViewTableColumn as="th" className="w-10" />
                    <CatalogViewTableColumn as="th" className="w-40">
                        Product Line
                    </CatalogViewTableColumn>
                    <CatalogViewTableColumn as="th">
                        Name
                    </CatalogViewTableColumn>
                </tr>
            </thead>
            <tbody ref={listRef}>
                {isLoading ? (
                    Array.from({ length: SKELETON_COUNT }, (_, index) => (
                        <tr key={`skeleton-${index}`} className="h-8 min-h-8">
                            <CatalogViewTableColumn>
                                <Skeleton className="size-5" />
                            </CatalogViewTableColumn>
                            <CatalogViewTableColumn>
                                <Skeleton className="h-4 w-10" />
                            </CatalogViewTableColumn>
                            <CatalogViewTableColumn>
                                <Skeleton className="h-4 w-20" />
                            </CatalogViewTableColumn>
                        </tr>
                    ))
                ) : (
                    <>
                        {paddingTop > 0 && (
                            <tr aria-hidden>
                                <td
                                    colSpan={3}
                                    style={{ height: paddingTop, padding: 0 }}
                                />
                            </tr>
                        )}
                        {virtualRows.map((virtualRow) => (
                            <CatalogViewTableRow
                                key={devices[virtualRow.index].id}
                                device={devices[virtualRow.index]}
                            />
                        ))}
                        {paddingBottom > 0 && (
                            <tr aria-hidden>
                                <td
                                    colSpan={3}
                                    style={{
                                        height: paddingBottom,
                                        padding: 0,
                                    }}
                                />
                            </tr>
                        )}
                    </>
                )}
            </tbody>
        </table>
    );
};
