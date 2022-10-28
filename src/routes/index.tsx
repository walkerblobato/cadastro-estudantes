import { Routes, Route, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useMenuContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Main } from '../pages';


export const AppRoutes = () => {
    const { setMenuOption } = useMenuContext();

    useEffect(() => {
        setMenuOption([
            {
                icon: 'home',
                to: '/pagina-inicial',
                label: 'Página inicial',
            },
        ]);
    }, []);

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Main />} />
            <Route path='*' element={<Navigate to='/pagina-inicial' />}/>
        </Routes>
    );
};