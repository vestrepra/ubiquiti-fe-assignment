import type { Device } from '@/shared/api/products/products.schema';
import { CatalogViewGridCard } from './CatalogViewGridCard';

export type CatalogViewGridProps = {
    devices: Device[];
};

export const CatalogViewGrid = ({ devices }: CatalogViewGridProps) => {
    return (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 py-1">
            {devices.map((device) => (
                <div key={device.id} className="h-43">
                    <CatalogViewGridCard device={device} />
                </div>
            ))}
        </div>
    );
};
