import { useState } from 'react';
import { Autocomplete } from '@base-ui/react/autocomplete';
import { cn } from '@/shared/lib/cn';
import { focusClassRounded } from '@/shared/lib/focus-class';
import SearchIcon from '@/assets/search-icon.svg?react';
import { SearchBarListItem } from './SearchBarListItem';

export type SearchBarProps<T> = {
    items: readonly T[];
    value: string;
    onValueChange: (value: string) => void;
    onItemSelect?: (item: T) => void;
    getItemKey: (item: T) => string;
    getItemLabel: (item: T) => string;
    getItemSecondary?: (item: T) => string | undefined;
    placeholder?: string;
    className?: string;
};

export const SearchBar = <T,>({
    items,
    value,
    onValueChange,
    onItemSelect,
    getItemKey,
    getItemLabel,
    getItemSecondary,
    placeholder = 'Search',
    className,
}: SearchBarProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Autocomplete.Root
            items={items}
            value={value}
            onValueChange={onValueChange}
            open={isOpen}
            onOpenChange={setIsOpen}
            mode="none"
            highlightItemOnHover={false}
        >
            <div className="relative w-80">
                <SearchIcon
                    aria-hidden
                    className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
                />
                <Autocomplete.Input
                    type="text"
                    placeholder={placeholder}
                    onFocus={() => {
                        if (value.trim() && items.length > 0) {
                            setIsOpen(true);
                        }
                    }}
                    className={cn(
                        'h-8 w-full rounded-sm bg-surface-search pl-8 pr-3 text-sm text-foreground',
                        'placeholder:text-muted-foreground focus:placeholder:opacity-0',
                        'hover:bg-border',
                        'focus:bg-surface-search focus:outline-primary',
                        focusClassRounded,
                        className,
                    )}
                />
            </div>

            <Autocomplete.Portal>
                <Autocomplete.Positioner sideOffset={1} align="start">
                    <Autocomplete.Popup
                        className={cn(
                            'w-80 overflow-hidden rounded-sm border border-border bg-surface shadow-high',
                            'max-h-60',
                        )}
                    >
                        <Autocomplete.List className="max-h-60 overflow-y-auto outline-none py-2">
                            {items.map((item) => (
                                <SearchBarListItem
                                    key={getItemKey(item)}
                                    value={item}
                                    query={value}
                                    primary={getItemLabel(item)}
                                    secondary={getItemSecondary?.(item)}
                                    onClick={() => onItemSelect?.(item)}
                                />
                            ))}
                        </Autocomplete.List>
                        {value.trim() && items.length === 0 && (
                            <Autocomplete.Empty className="px-3 py-2 text-sm text-muted-foreground">
                                No results found
                            </Autocomplete.Empty>
                        )}
                    </Autocomplete.Popup>
                </Autocomplete.Positioner>
            </Autocomplete.Portal>
        </Autocomplete.Root>
    );
};
