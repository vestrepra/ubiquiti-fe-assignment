import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts, type Device } from '@/shared/api/products';
import { SearchBar } from '@/shared/ui/search-bar/SearchBar';

export const CatalogSearch = () => {
    const MAX_RESULTS = 5;

    const navigate = useNavigate();
    const { data: devices = [] } = useProducts();
    const [query, setQuery] = useState('');

    const results = useMemo(() => {
        const searchQuery = query.trim().toLowerCase();
        if (!searchQuery) {
            return [];
        }

        return devices
            .filter((device) => {
                const name = device.product.name.toLowerCase();
                const shortnames = device.shortnames.join(' ').toLowerCase();

                return (
                    name.includes(searchQuery) || shortnames.includes(searchQuery)
                );
            })
            .sort((a, b) => a.product.name.localeCompare(b.product.name))
            .slice(0, MAX_RESULTS);
    }, [devices, query]);

    return (
        <SearchBar<Device>
            items={results}
            value={query}
            onValueChange={setQuery}
            onItemSelect={(device) => navigate(`/product/${device.id}`)}
            getItemKey={(device) => device.id}
            getItemLabel={(device) => device.product.name}
            getItemSecondary={(device) => device.shortnames[0]}
        />
    );
};
