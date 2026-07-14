import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts, type Device } from '@/shared/api/products';
import { useCatalogFilters } from '@/features/catalog/hooks/useCatalogFilters';
import { filterDevices } from '@/features/catalog/lib/filter-devices';
import { SearchBar } from '@/shared/ui/search-bar/SearchBar';

const MAX_RESULTS = 5;

export const CatalogSearch = () => {
    const navigate = useNavigate();
    const { data: devices = [] } = useProducts();
    const { query, setQuery } = useCatalogFilters();
    const [inputValue, setInputValue] = useState(query);
    const [lastQuery, setLastQuery] = useState(query);

    if (query !== lastQuery) {
        setLastQuery(query);
        setInputValue(query);
    }

    const handleValueChange = (nextValue: string) => {
        setInputValue(nextValue);
        if (!nextValue.trim()) {
            setQuery('');
        }
    };

    const results = useMemo(() => {
        return filterDevices(devices, { query: inputValue })
            .sort((a, b) => a.product.name.localeCompare(b.product.name))
            .slice(0, MAX_RESULTS);
    }, [devices, inputValue]);

    return (
        <SearchBar<Device>
            items={results}
            value={inputValue}
            onValueChange={handleValueChange}
            onSubmit={() => setQuery(inputValue)}
            onClear={() => {
                setInputValue('');
                setQuery('');
            }}
            onItemSelect={(device) => navigate(`/product/${device.id}`)}
            getItemKey={(device) => device.id}
            getItemLabel={(device) => device.product.name}
            getItemSecondary={(device) => device.shortnames[0]}
        />
    );
};
