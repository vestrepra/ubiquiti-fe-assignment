import { useState } from 'react';
import { CheckboxGroup } from '@base-ui/react/checkbox-group';
import { useProductLines } from '@/shared/api/products/products.queries';
import { useCatalogFilters } from '@/features/catalog/hooks/useCatalogFilters';
import { Button } from '@/shared/ui/button/Button';
import { Checkbox } from '@/shared/ui/checkbox/Checkbox';
import { Popover } from '@/shared/ui/popover/Popover';
import { cn } from '@/shared/lib/cn';

export const CatalogFilter = () => {
    const { data: productLines = [] } = useProductLines();
    const { lines, setLines } = useCatalogFilters();
    const [open, setOpen] = useState(false);

    const toggleLine = (lineId: string, checked: boolean) => {
        if (checked) {
            setLines([...lines, lineId]);
            return;
        }

        setLines(lines.filter((id) => id !== lineId));
    };

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
            align="end"
            trigger={
                <Button isActive={open || lines.length > 0}>Filter</Button>
            }
            className="flex w-44 flex-col gap-3 p-3 max-h-96 overflow-y-auto"
        >
            <p className="text-sm font-medium text-heading">Product line</p>
            <CheckboxGroup className="flex flex-col gap-2">
                {productLines.map((line) => (
                    <Checkbox
                        key={line.id}
                        label={line.name}
                        checked={lines.includes(line.id)}
                        onCheckedChange={(checked) =>
                            toggleLine(line.id, checked)
                        }
                    />
                ))}
            </CheckboxGroup>
            <Button
                disabled={lines.length === 0}
                onClick={() => setLines([])}
                className={cn(
                    'self-start',
                    lines.length === 0
                        ? 'text-faint-foreground'
                        : 'text-red-500',
                )}
            >
                Reset
            </Button>
        </Popover>
    );
};
