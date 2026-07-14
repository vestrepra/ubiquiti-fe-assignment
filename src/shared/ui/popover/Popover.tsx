import type { ReactElement, ReactNode } from 'react';
import { Popover as BasePopover } from '@base-ui/react/popover';
import { cn } from '@/shared/lib/cn';

export type PopoverProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    trigger: ReactElement;
    children: ReactNode;
    className?: string;
    align?: 'start' | 'center' | 'end';
};

export const Popover = ({
    open,
    onOpenChange,
    trigger,
    children,
    className,
    align = 'center',
}: PopoverProps) => {
    return (
        <BasePopover.Root open={open} onOpenChange={onOpenChange}>
            <BasePopover.Trigger render={trigger} />
            <BasePopover.Portal>
                <BasePopover.Positioner
                    className="z-50"
                    side="bottom"
                    align={align}
                    sideOffset={4}
                >
                    <BasePopover.Popup
                        className={cn(
                            'rounded-md border border-border bg-surface shadow-high outline-none',
                            className,
                        )}
                    >
                        {children}
                    </BasePopover.Popup>
                </BasePopover.Positioner>
            </BasePopover.Portal>
        </BasePopover.Root>
    );
};
