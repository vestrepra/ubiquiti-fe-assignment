import type { ReactElement, ReactNode } from 'react';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { cn } from '@/shared/lib/cn';
import { focusClassRounded } from '@/shared/lib/focus-class';

export type DialogProps = {
    trigger: ReactElement;
    title: string;
    children: ReactNode;
    className?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
};

export const Dialog = ({
    trigger,
    title,
    children,
    className,
    open,
    onOpenChange,
}: DialogProps) => {
    return (
        <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
            <BaseDialog.Trigger render={trigger} />
            <BaseDialog.Portal>
                <BaseDialog.Backdrop className="dialog-backdrop" />
                <BaseDialog.Viewport className="dialog-viewport">
                    <BaseDialog.Popup className="dialog-popup outline-none">
                        <div
                            className={cn(
                                'dialog-popup-panel flex max-h-[min(32rem,90dvh)] w-full max-w-2xl flex-col overflow-hidden',
                                className,
                            )}
                        >
                            <header className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
                                <BaseDialog.Title className="text-sm font-bold text-heading">
                                    {title}
                                </BaseDialog.Title>
                                <BaseDialog.Close
                                    className={cn(
                                        'text-sm text-muted-foreground hover:cursor-pointer hover:text-foreground',
                                        focusClassRounded,
                                    )}
                                    aria-label="Close dialog"
                                >
                                    Close
                                </BaseDialog.Close>
                            </header>
                            <div className="min-h-0 flex-1 overflow-auto p-4">
                                {children}
                            </div>
                        </div>
                    </BaseDialog.Popup>
                </BaseDialog.Viewport>
            </BaseDialog.Portal>
        </BaseDialog.Root>
    );
};
