import { useNavigate } from 'react-router-dom';
import type { Device } from '@/shared/api/products/products.schema';
import { deviceImageUrl } from '@/shared/lib/device-image-url';
import { focusClassInset } from '@/shared/lib/focus-class';
import { cn } from '@/shared/lib/cn';
import { Image } from '@/shared/ui/image/Image';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';
import { CatalogViewTableColumn } from './CatalogViewTableColumn';

const SKELETON_COUNT = 12;

export type CatalogViewTableProps = {
    devices: Device[];
    isLoading?: boolean;
};

export const CatalogViewTable = ({
    devices,
    isLoading = false,
}: CatalogViewTableProps) => {
    const navigate = useNavigate();

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
            <tbody>
                {isLoading
                    ? Array.from({ length: SKELETON_COUNT }, (_, index) => (
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
                    : devices.map((device: Device) => (
                          <tr
                              key={device.id}
                              role="link"
                              tabIndex={0}
                              aria-label={device.product.name}
                              onClick={() => navigate(`/product/${device.id}`)}
                              onKeyDown={(event) => {
                                  if (
                                      event.key === 'Enter' ||
                                      event.key === ' '
                                  ) {
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
                      ))}
            </tbody>
        </table>
    );
};
