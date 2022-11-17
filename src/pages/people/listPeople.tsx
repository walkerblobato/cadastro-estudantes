import { useSearchParams } from 'react-router-dom';
import { ToolbarList } from '../../shared/components';
import { LayoutPage } from '../../shared/layouts';
import { useMemo, useEffect } from 'react';
import { PeopleService } from '../../shared/services/api/pessoas/PeopleService';
import { useDebounce } from '../../shared/hooks';


export const ListPeople = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce(1500);

    const search = useMemo(() => {
        return searchParams.get('search') || '';
    }, [searchParams]);

    useEffect(() => {

        debounce(() => {
            PeopleService.getAll(1, search)
            .then((result) => {
                if (result instanceof Error) {
                    alert(result.message);
                    return;
                }

                console.log(result);
            });
        });

    }, [search]);
    
    return (
        <LayoutPage 
            title='Listagem de pessoas'
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