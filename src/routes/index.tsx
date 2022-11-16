import { Routes, Route, Navigate } from 'react-router-dom';
import { useMenuContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Main, ListCities } from '../pages';


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
        ]);
    }, []);

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Main />} />
            <Route path='cidades' element={<ListCities />} />
            <Route path='*' element={<Navigate to='/pagina-inicial' />}/>
        </Routes>
    );
};