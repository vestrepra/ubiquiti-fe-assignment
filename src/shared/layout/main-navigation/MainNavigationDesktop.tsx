import { mainNavItems, type mainNavItem } from './main-navigation.config';
import { MainNavigationItem } from './MainNavigationItem';

export const MainNavigationDesktop = () => {
    return (
        <ul className="items-center gap-4 hidden sm:flex">
            {mainNavItems.map((item: mainNavItem) => (
                <MainNavigationItem key={item.to} to={item.to}>
                    {item.label}
                </MainNavigationItem>
            ))}
        </ul>
    );
};
