import type { Device } from '@/shared/api/products/products.schema';
import { CatalogViewGridCard } from './CatalogViewGridCard';
import { CatalogViewGridCardSkeleton } from './CatalogViewGridCardSkeleton';

const SKELETON_COUNT = 12;

export type CatalogViewGridProps = {
    devices: Device[];
    isLoading?: boolean;
};

export const CatalogViewGrid = ({
    devices,
    isLoading = false,
}: CatalogViewGridProps) => {
    return (
        <div
            aria-busy={isLoading}
            aria-label={isLoading ? 'Loading products' : undefined}
            className="grid grid-cols-2 gap-4 py-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
        >
            {isLoading
                ? Array.from({ length: SKELETON_COUNT }, (_, index) => (
                      <div key={`skeleton-${index}`} className="h-43">
                          <CatalogViewGridCardSkeleton />
                      </div>
                  ))
                : devices.map((device) => (
                      <div key={device.id} className="h-43">
                          <CatalogViewGridCard device={device} />
                      </div>
                  ))}
        </div>
    );
};
