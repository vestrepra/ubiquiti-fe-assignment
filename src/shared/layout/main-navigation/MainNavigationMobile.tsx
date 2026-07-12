import { useState } from 'react';
import { Drawer } from '@/shared/ui/drawer/Drawer';
import { Hamburger } from '@/shared/ui/hamburger/Hamburger';

import { MainNavigationItem } from './MainNavigationItem';
import { mainNavItems, type mainNavItem } from './main-navigation.config';

export const MainNavigationMobile = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <Drawer
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            trigger={<Hamburger isActive={isDrawerOpen} />}
        >
            <div className="flex flex-col justify-between h-full">
                <ul className="divide-y divide-muted-foreground">
                    {mainNavItems.map((item: mainNavItem) => (
                        <MainNavigationItem
                            key={item.to}
                            to={item.to}
                            className="block py-2"
                            onClick={() => setIsDrawerOpen(false)}
                        >
                            {item.label}
                        </MainNavigationItem>
                    ))}
                </ul>
                <span className="text-subtle-foreground">
                    Silvestrs Prancans
                </span>
            </div>
        </Drawer>
    );
};
