import { useNavigate } from 'react-router-dom';
import type { Device } from '@/shared/api/products/products.schema';
import { deviceImageUrl } from '@/shared/lib/device-image-url';
import { focusClassInset } from '@/shared/lib/focus-class';
import { cn } from '@/shared/lib/cn';
import { Image } from '@/shared/ui/image/Image';
import { CatalogViewTableColumn } from './CatalogViewTableColumn';

export type CatalogViewTableRowProps = {
    device: Device;
};

export const CatalogViewTableRow = ({ device }: CatalogViewTableRowProps) => {
    const navigate = useNavigate();

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTableRowElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            navigate(`/product/${device.id}`);
        }
    };

    return (
        <tr
            role="link"
            tabIndex={0}
            aria-label={device.product.name}
            onClick={() => navigate(`/product/${device.id}`)}
            onKeyDown={handleKeyDown}
            className={cn(
                'h-8 min-h-8 cursor-pointer hover:bg-surface-header',
                focusClassInset,
                'group/row',
            )}
        >
            <CatalogViewTableColumn>
                <Image
                    src={deviceImageUrl({
                        deviceId: device.id,
                        imageHash: device.images.default,
                        width: 20,
                    })}
                    alt={device.product.name}
                />
            </CatalogViewTableColumn>
            <CatalogViewTableColumn>
                <span className="block truncate text-foreground">
                    {device.line.name}
                </span>
            </CatalogViewTableColumn>
            <CatalogViewTableColumn>
                <span className="block truncate text-muted-foreground">
                    {device.product.name}
                </span>
            </CatalogViewTableColumn>
        </tr>
    );
};
