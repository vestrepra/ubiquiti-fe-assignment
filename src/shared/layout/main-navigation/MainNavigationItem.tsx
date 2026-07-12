import { NavLink } from 'react-router-dom';
import { cn } from '@/shared/lib/cn';
import { focusClassRounded } from '@/shared/lib/focus-class';

export type MainNavigationItemProps = {
    to: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
};

export const MainNavigationItem = ({
    to,
    children,
    className,
    onClick,
}: MainNavigationItemProps) => {
    return (
        <li>
            <NavLink
                to={to}
                className={({ isActive }) =>
                    cn(
                        'px-1 py-1 text-subtle-foreground hover:text-foreground',
                        focusClassRounded,
                        className,
                        isActive && 'text-foreground',
                    )
                }
                end
                onClick={onClick}
            >
                {children}
            </NavLink>
        </li>
    );
};
