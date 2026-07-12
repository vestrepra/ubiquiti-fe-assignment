import { Drawer as BaseDrawer } from '@base-ui/react/drawer';

export type DrawerProps = {
    isDrawerOpen: boolean;
    setIsDrawerOpen: (open: boolean) => void;
    trigger: React.ReactNode;
    children: React.ReactNode;
};

export const Drawer = ({
    isDrawerOpen,
    setIsDrawerOpen,
    trigger,
    children,
}: DrawerProps) => {
    return (
        <BaseDrawer.Root
            open={isDrawerOpen}
            onOpenChange={setIsDrawerOpen}
            swipeDirection="right"
        >
            <BaseDrawer.Trigger
                className="cursor-pointer sm:hidden"
                aria-label="Open menu"
            >
                {trigger}
            </BaseDrawer.Trigger>
            <BaseDrawer.Portal>
                <BaseDrawer.Backdrop className="nav-drawer-backdrop" />
                <BaseDrawer.Viewport className="nav-drawer-viewport">
                    <BaseDrawer.Popup className="nav-drawer-popup">
                        <BaseDrawer.Content className="h-full">
                            {children}
                        </BaseDrawer.Content>
                    </BaseDrawer.Popup>
                </BaseDrawer.Viewport>
            </BaseDrawer.Portal>
        </BaseDrawer.Root>
    );
};
