import { Routes, Route, Navigate } from 'react-router-dom';
import { useMenuContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Main, ListPeople, DetailsPeople, ListCities, DetailsCities  } from '../pages';


export const AppRoutes = () => {
    const { setMenuOption } = useMenuContext();

    useEffect(() => {
        setMenuOption([
            {
                icon: 'home',
                to: '/pagina-inicial',
                label: 'Página inicial',
            },
            {
                icon: 'location_city',
                to: '/cidades',
                label: 'Cidades',
            },
            {
                icon: 'people',
                to: '/pessoas',
                label: 'Pessoas',
            },
        ]);
    }, []);

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Main />} />

            <Route path='pessoas' element={<ListPeople />} />
            <Route path='/pessoas/detalhe/:id' element={<DetailsPeople />}/>

            <Route path='cidades' element={<ListCities />} />
            <Route path='/cidades/detalhe/:id' element={<DetailsCities />}/>

            <Route path='*' element={<Navigate to='/pagina-inicial' />}/>
        </Routes>
    );
};