import { cn } from '@/shared/lib/cn';
import { focusClassRounded } from '@/shared/lib/focus-class';
import type { ButtonProps as BaseButtonProps } from '@base-ui/react/button';
import { Button as BaseButton } from '@base-ui/react/button';

export type CtaProps = BaseButtonProps & {
    className?: string;
};

export const Cta = ({ children, className, ...props }: CtaProps) => {
    return (
        <BaseButton
            className={cn(
                'inline-flex items-center justify-center text-sm text-primary',
                'hover:cursor-pointer hover:text-primary-hover',
                focusClassRounded,
                className,
            )}
            {...props}
        >
            {children}
        </BaseButton>
    );
};
