import { useProducts } from '@/shared/api/products';
import { CatalogTable } from '../components/catalog-table/CatalogTable';
import { Toolbar } from '@/shared/layout/toolbar/Toolbar';
import { CatalogTools } from '../components/catalog-tools/CatalogTools';
import { CatalogSearch } from '../components/catalog-tools/CatalogSearch';

export const CatalogPage = () => {
    const { data: devices } = useProducts();
    return (
        <>
            <Toolbar
                leftSide={<CatalogSearch />}
                rightSide={<CatalogTools />}
            />
            <div>
                <CatalogTable devices={devices ?? []} />
            </div>
        </>
    );
};
