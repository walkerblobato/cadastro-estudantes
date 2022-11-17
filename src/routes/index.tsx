import { Routes, Route, Navigate } from 'react-router-dom';
import { useMenuContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Main, ListPeople } from '../pages';


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
            <Route path='*' element={<Navigate to='/pagina-inicial' />}/>
        </Routes>
    );
};