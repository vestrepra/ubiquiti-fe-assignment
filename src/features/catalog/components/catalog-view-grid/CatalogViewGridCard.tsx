import { Link } from 'react-router-dom';
import type { Device } from '@/shared/api/products/products.schema';
import { deviceImageUrl } from '@/shared/lib/device-image-url';
import { cn } from '@/shared/lib/cn';
import { focusClassRounded } from '@/shared/lib/focus-class';
import { Image } from '@/shared/ui/image/Image';

export type CatalogViewGridCardProps = {
    device: Device;
};

export const CatalogViewGridCard = ({ device }: CatalogViewGridCardProps) => {
    return (
        <Link
            to={`/product/${device.id}`}
            className={cn(
                'group flex w-full h-full flex-col overflow-hidden rounded-md border border-border bg-surface',
                'hover:bg-surface-muted',
                focusClassRounded,
            )}
        >
            <div className="relative flex items-center justify-center bg-surface-header h-25">
                <span className="absolute right-1 top-1 rounded-sm bg-surface px-1.5 py-0.5 text-xs text-primary">
                    {device.line.name}
                </span>
                <Image
                    showSkeleton
                    src={deviceImageUrl({
                        deviceId: device.id,
                        imageHash: device.images.default,
                        width: 320,
                    })}
                    alt=""
                    className="h-full w-full object-contain"
                />
            </div>

            <div className="flex flex-col justify-between py-2 px-1.5 grow">
                <div className="truncate text-sm font-medium text-foreground">
                    {device.product.name}
                </div>
                <div className="truncate text-xs text-muted-foreground">
                    {device.shortnames.join(', ')}
                </div>
            </div>
        </Link>
    );
};
