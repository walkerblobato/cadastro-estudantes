import { Routes, Route, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useMenuContext } from '../shared/contexts';


export const AppRoutes = () => {
    const { changeMenuOpen } = useMenuContext();

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Button variant='contained' color='primary' onClick={changeMenuOpen}>MENU</Button>} />
            <Route path='*' element={<Navigate to='/pagina' />}/>
        </Routes>
    );
};