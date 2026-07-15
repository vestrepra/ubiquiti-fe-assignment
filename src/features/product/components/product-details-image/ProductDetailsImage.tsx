import { Image } from '@/shared/ui/image/Image';
import { type Device } from '@/shared/api/products';
import { deviceImageUrl } from '@/shared/lib/device-image-url';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

export type ProductDetailsImageProps = {
    device: Device;
    isLoading: boolean;
};

export const ProductDetailsImage = ({
    device,
    isLoading,
}: ProductDetailsImageProps) => {
    if (isLoading) {
        return (
            <div className="flex min-h-80 items-center justify-center rounded-md bg-surface-muted">
                <Skeleton className="w-full h-full" />
            </div>
        );
    }

    return (
        <div className="relative flex min-h-80 items-center justify-center rounded-md bg-surface-muted">
            <Image
                src={deviceImageUrl({
                    deviceId: device.id,
                    imageHash: device.images.default,
                    width: 640,
                })}
                alt={device.product.name}
                loading="eager"
                className="relative z-10 max-h-full max-w-full object-contain p-8"
            />
        </div>
    );
};
