import { Image } from '@/shared/ui/image/Image';
import { type Device } from '@/shared/api/products';
import { deviceImageUrl } from '@/shared/lib/device-image-url';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

export type ProductDetailsImageProps = {
    device: Device | undefined;
    isLoading: boolean;
};

export const ProductDetailsImage = ({
    device,
    isLoading,
}: ProductDetailsImageProps) => {
    return (
        <div className="relative flex h-80 items-center justify-center rounded-md bg-surface-muted">
            {isLoading || !device ? (
                <Skeleton className="absolute inset-0 rounded-md" />
            ) : (
                <Image
                    key={device.id}
                    showSkeleton
                    skeletonClassName="rounded-md"
                    src={deviceImageUrl({
                        deviceId: device.id,
                        imageHash: device.images.default,
                        width: 640,
                    })}
                    alt={device.product.name}
                    loading="eager"
                    className="h-full w-full object-contain"
                />
            )}
        </div>
    );
};
