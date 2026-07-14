import { Autocomplete } from '@base-ui/react/autocomplete';
import { cn } from '@/shared/lib/cn';
import { highlightMatch } from '@/shared/lib/highlight-match';

export type SearchBarListItemProps = Autocomplete.Item.Props & {
    query: string;
    primary: string;
    secondary?: string;
    className?: string;
};

export const SearchBarListItem = ({
    query,
    primary,
    secondary,
    className,
    ...props
}: SearchBarListItemProps) => (
    <Autocomplete.Item
        className={cn(
            'flex items-center justify-between px-3 py-2 text-sm',
            'hover:bg-surface-header hover:cursor-pointer',
            'data-highlighted:ring-1 data-highlighted:ring-inset data-highlighted:ring-primary',
            className,
        )}
        {...props}
    >
        <span className="truncate text-logo">{highlightMatch(primary, query ?? '')}</span>
        {secondary && (
            <span className="ml-3 shrink-0 text-subtle-foreground">{secondary}</span>
        )}
    </Autocomplete.Item>
);
