import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useMenuContext } from '../../contexts';
import profile from './profile-walker.jpg';


// interface IListItemMenuProps {
//  to: string;
//  icon: string;
//  label: string;
//  onClick: () => void | undefined;
// }
// const ListItemMenu: React.FC<IListItemMenuProps> = ({ to, icon, label, onClick }) => {
//     const navigate = useNavigate();

//     const handleClick = () => {
//         navigate(to);
//         // Se undefined executa a função
//         onClick?.();
//     };

//     return (
//         <ListItemButton onClick={onClick}>
//             <ListItemIcon>
//                 <Icon>{icon}</Icon>
//             </ListItemIcon>
//             <ListItemText primary={label}/>
//         </ListItemButton>
//     );
// };

interface ILateralMenu {
    children: React.ReactNode;
}

export const LateralMenu: React.FC<ILateralMenu> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { isMenuOpen, changeMenuOpen } = useMenuContext();

    return (
        <>
            <Drawer 
                open={isMenuOpen} 
                variant={smDown ? 'temporary' : 'permanent'}
                onClose={changeMenuOpen}
            >
                <Box 
                    width={theme.spacing(28)}
                    height='100%' 
                    display='flex' 
                    flexDirection='column'
                >
                    
                    <Box 
                        width='100%' 
                        height={theme.spacing(20)} 
                        display='flex' 
                        alignItems='center' 
                        justifyContent='center'
                    >
                        <Avatar sx={{ height: theme.spacing(12), width: theme.spacing(12) }}src={profile} />
                    </Box>

                    <Divider />

                    <Box flex={1}>
                        <List component='nav'>
                        <ListItemButton >
                            <ListItemIcon>
                                <Icon>home</Icon>
                            </ListItemIcon>
                            <ListItemText primary='Página inicial'/>
                        </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Drawer>

            <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>{children}</Box>
        </>
    );
};