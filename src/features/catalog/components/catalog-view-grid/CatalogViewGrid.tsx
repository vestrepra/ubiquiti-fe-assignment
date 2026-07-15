import { useWindowVirtualizer } from '@tanstack/react-virtual';
import type { Device } from '@/shared/api/products/products.schema';
import { useCatalogGridColumns } from '@/features/catalog/hooks/useCatalogGridColumns';
import { useWindowScrollMargin } from '@/features/catalog/hooks/useWindowScrollMargin';
import { CatalogViewGridCard } from './CatalogViewGridCard';
import { CatalogViewGridCardSkeleton } from './CatalogViewGridCardSkeleton';

const SKELETON_COUNT = 12;
const CARD_HEIGHT = 172;
const GRID_GAP = 16;

export type CatalogViewGridProps = {
    devices: Device[];
    isLoading?: boolean;
};

export const CatalogViewGrid = ({
    devices,
    isLoading = false,
}: CatalogViewGridProps) => {
    'use no memo';

    const columnCount = useCatalogGridColumns();

    const { ref: listRef, scrollMargin } =
        useWindowScrollMargin<HTMLDivElement>();

    const virtualizer = useWindowVirtualizer({
        count: isLoading ? 0 : devices.length,
        estimateSize: () => CARD_HEIGHT,
        lanes: columnCount,
        gap: GRID_GAP,
        overscan: columnCount * 3,
        scrollMargin,
    });

    if (isLoading) {
        return (
            <div
                aria-busy
                aria-label="Loading products"
                className="grid grid-cols-2 gap-4 py-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
            >
                {Array.from({ length: SKELETON_COUNT }, (_, index) => (
                    <div key={`skeleton-${index}`} className="h-43">
                        <CatalogViewGridCardSkeleton />
                    </div>
                ))}
            </div>
        );
    }

    const laneWidth = `calc((100% - ${(columnCount - 1) * GRID_GAP}px) / ${columnCount})`;

    return (
        <div
            ref={listRef}
            className="relative w-full py-1"
            style={{ height: virtualizer.getTotalSize() }}
        >
            {virtualizer.getVirtualItems().map((virtualItem) => {
                const device = devices[virtualItem.index];

                return (
                    <div
                        key={device.id}
                        className="absolute top-0 h-43"
                        style={{
                            width: laneWidth,
                            left: `calc((${laneWidth} + ${GRID_GAP}px) * ${virtualItem.lane})`,
                            transform: `translateY(${virtualItem.start - scrollMargin}px)`,
                        }}
                    >
                        <CatalogViewGridCard device={device} />
                    </div>
                );
            })}
        </div>
    );
};
