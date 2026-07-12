import { Link } from 'react-router-dom';

import { focusClass } from '@/shared/lib/focus-class';
import { Logo } from '@/shared/ui/logo/Logo';

import { MainNavigationDesktop } from './MainNavigationDesktop';
import { MainNavigationMobile } from './MainNavigationMobile';

export const MainNavigation = () => {
    return (
        <nav
            aria-label="Main navigation"
            className="flex flex-1 items-center justify-between sm:justify-start gap-4"
        >
            <Link to="/" aria-label="Logo Home" className={focusClass}>
                <Logo className="size-10 p-2.5" />
            </Link>
            <MainNavigationDesktop />
            <MainNavigationMobile />
        </nav>
    );
};
