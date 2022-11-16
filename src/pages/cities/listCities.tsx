import { useSearchParams } from 'react-router-dom';
import { ToolbarList } from '../../shared/components';
import { LayoutPage } from '../../shared/layouts';
import { useMemo } from 'react';

export const ListCities = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const search = useMemo(() => {
        return searchParams.get('search') || '';
    }, [searchParams]);
    
    return (
        <LayoutPage 
            title='Listagem de cidades'
            toolbar={
                <ToolbarList
                    showSearchInput 
                    newButtonText='Nova'
                    searchText={search}
                    // { replace: true} impede que o react router dom fique registrando várias buscas no navegador
                    changeSearchText={text => setSearchParams({ search: text }, { replace: true })}
                />
            }
        >
        </LayoutPage>
    );
};