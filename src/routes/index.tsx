import { Routes, Route, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useMenuContext } from '../shared/contexts';
import { useEffect } from 'react';


export const AppRoutes = () => {
    const { changeMenuOpen, setMenuOption } = useMenuContext();

    useEffect(() => {
        setMenuOption([
            {
                icon: 'home',
                to: '/pagina-inicial',
                label: 'Página inicial',
            },
            {
                icon: 'star',
                to: '/pagina-inicial',
                label: 'Cidades',
            },
        ]);
    }, []);

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Button variant='contained' color='primary' onClick={changeMenuOpen}>MENU</Button>} />
            <Route path='*' element={<Navigate to='/pagina-inicial' />}/>
        </Routes>
    );
};