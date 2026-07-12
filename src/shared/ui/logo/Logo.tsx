import LogoSvg from '@/assets/logo.svg?react';
import { cn } from '@/shared/lib/cn';

export type LogoProps = {
    className?: string;
};

export const Logo = ({ className }: LogoProps) => {
    return (
        <LogoSvg className={cn('text-logo hover:text-primary', className)} />
    );
};
