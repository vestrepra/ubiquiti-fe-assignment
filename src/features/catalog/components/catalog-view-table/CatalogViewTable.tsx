import { useNavigate } from 'react-router-dom';
import type { Device } from '@/shared/api/products/products.schema';
import { deviceImageUrl } from '@/shared/lib/device-image-url';
import { focusClassInset } from '@/shared/lib/focus-class';
import { cn } from '@/shared/lib/cn';
import { CatalogViewTableColumn } from './CatalogViewTableColumn';

export type CatalogViewTableProps = {
    devices: Device[];
};

export const CatalogViewTable = ({ devices }: CatalogViewTableProps) => {
    const navigate = useNavigate();

    return (
        <table className="w-full border-separate border-spacing-0">
            <thead className="sticky h-8 min-h-8 top-28.5 z-40 bg-surface supports-backdrop-filter:bg-surface/95">
                <tr>
                    <CatalogViewTableColumn as="th" className="w-10" />
                    <CatalogViewTableColumn as="th">
                        Product Line
                    </CatalogViewTableColumn>
                    <CatalogViewTableColumn as="th">
                        Name
                    </CatalogViewTableColumn>
                </tr>
            </thead>
            <tbody>
                {devices.map((device: Device) => (
                    <tr
                        key={device.id}
                        role="link"
                        tabIndex={0}
                        aria-label={device.product.name}
                        onClick={() => navigate(`/product/${device.id}`)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                navigate(`/product/${device.id}`);
                            }
                        }}
                        className={cn(
                            'h-8 min-h-8 cursor-pointer hover:bg-surface-header',
                            focusClassInset,
                            'group/row',
                        )}
                    >
                        <CatalogViewTableColumn>
                            <img
                                src={deviceImageUrl({
                                    deviceId: device.id,
                                    imageHash: device.images.default,
                                    width: 20,
                                })}
                                alt={device.product.name}
                            />
                        </CatalogViewTableColumn>
                        <CatalogViewTableColumn>
                            <span className="text-foreground">
                                {device.line.name}
                            </span>
                        </CatalogViewTableColumn>
                        <CatalogViewTableColumn>
                            <span className="text-muted-foreground">
                                {device.product.name}
                            </span>
                        </CatalogViewTableColumn>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
