import ListViewIcon from '@/assets/list-view-icon.svg?react';
import GridViewIcon from '@/assets/grid-view-icon.svg?react';
import { Button } from '@/shared/ui/button/Button';

export type CatalogToolsProps = {
    view: 'table' | 'grid';
    setView: (view: 'table' | 'grid') => void;
};

export const CatalogTools = ({ view, setView }: CatalogToolsProps) => {
    return (
        <div className="flex gap-2">
            <Button
                isActive={view === 'table'}
                onClick={() => setView('table')}
            >
                <ListViewIcon />
            </Button>
            <Button isActive={view === 'grid'} onClick={() => setView('grid')}>
                <GridViewIcon />
            </Button>
            <Button className="text-muted-foreground">Filter</Button>
        </div>
    );
};
