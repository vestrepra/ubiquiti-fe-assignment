import { cn } from '@/shared/lib/cn';
import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';

export type CheckboxProps = {
    label: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
};

export const Checkbox = ({
    label,
    checked,
    onCheckedChange,
}: CheckboxProps) => {
    return (
        <label
            className={cn(
                'flex items-center gap-2 rounded-sm px-0.5 text-pale-text cursor-pointer',
                'has-focus-visible:outline-primary has-focus-visible:outline-1',
                'group',
            )}
        >
            <CheckboxPrimitive.Root
                checked={checked}
                onCheckedChange={onCheckedChange}
                className="flex size-4 shrink-0 items-center justify-center border border-border rounded-sm data-checked:bg-primary data-checked:border-primary outline-none focus-visible:outline-none group-hover:border-primary"
            >
                <CheckboxPrimitive.Indicator className="flex data-unchecked:hidden">
                    <CheckIcon />
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
            {label}
        </label>
    );
};

// Exported from Figma as a SVG
const CheckIcon = () => {
    return (
        <svg
            width="8"
            height="6"
            viewBox="0 0 8 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2.62099 4.03595L0.853541 2.2685C0.658282 2.07324 0.341703 2.07324 0.146444 2.2685C-0.0487772 2.46372 -0.0488202 2.78023 0.146348 2.9755L1.63096 4.46092L1.68301 4.51097L1.91488 4.74285C2.30541 5.13337 2.93857 5.13337 3.3291 4.74285L7.21847 0.853474C7.41371 0.65823 7.41371 0.341677 7.21847 0.146433C7.02324 -0.0487949 6.70672 -0.0488134 6.51147 0.146392L2.62099 4.03595Z"
                fill="white"
            />
        </svg>
    );
};
