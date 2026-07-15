import { cn } from '@/shared/lib/cn';
import { focusClassRounded } from '@/shared/lib/focus-class';
import type { ButtonProps as BaseButtonProps } from '@base-ui/react/button';
import { Button as BaseButton } from '@base-ui/react/button';

export type ButtonProps = BaseButtonProps & {
    className?: string;
    isActive?: boolean;
};

export const Button = ({
    children,
    className,
    isActive,
    ...props
}: ButtonProps) => {
    return (
        <BaseButton
            data-active={isActive}
            className={cn(
                'flex items-center justify-center',
                'hover:cursor-pointer hover:bg-surface-header px-2 py-1 rounded-sm',
                'data-[active=true]:text-primary data-[active=true]:bg-surface-header',
                focusClassRounded,
                className,
            )}
            {...props}
        >
            {children}
        </BaseButton>
    );
};
