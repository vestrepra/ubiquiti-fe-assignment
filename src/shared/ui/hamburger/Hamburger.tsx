import { cn } from '@/shared/lib/cn';

const lineClass = 'block h-0.5 transition-all duration-300 bg-current';

export type HamburgerProps = {
    isActive?: boolean;
    className?: string;
    onClick?: () => void;
};

export const Hamburger = ({
    isActive = false,
    className,
    onClick,
}: HamburgerProps) => {
    return (
        <div
            className={cn(
                'flex flex-col items-justify-between items-end gap-1.25',
                className,
            )}
            onClick={onClick}
        >
            <span className={cn(lineClass, 'w-6')}></span>
            <span className={cn(lineClass, 'w-5', isActive && 'w-6')}></span>
            <span className={cn(lineClass, 'w-4', isActive && 'w-6')}></span>
        </div>
    );
};
