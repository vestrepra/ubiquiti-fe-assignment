import { useMemo } from 'react';
import { type Device } from '@/shared/api/products';
import { Cta } from '@/shared/ui/cta/Cta';
import { Dialog } from '@/shared/ui/dialog/Dialog';

export type ProductJsonDetailsDialogProps = {
    device: Device;
};

export const ProductJsonDetailsDialog = ({
    device,
}: ProductJsonDetailsDialogProps) => {
    const json = useMemo(() => JSON.stringify(device, null, 2), [device]);

    return (
        <Dialog
            trigger={<Cta>See All Details as JSON</Cta>}
            title={device.product.name}
        >
            <pre className="wrap-break-word font-mono text-xs whitespace-pre-wrap text-foreground">
                {json}
            </pre>
        </Dialog>
    );
};
