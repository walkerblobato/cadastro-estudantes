import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

import { useAppThemeContext, useAuthContext, useMenuContext } from '../../contexts';
import profile from './profile-walker.jpg';


interface IListItemMenuProps {
 to: string;
 icon: string;
 label: string;
 onClick: (() => void) | undefined;
}

const ListItemMenu: React.FC<IListItemMenuProps> = ({ to, icon, label, onClick }) => {
    const navigate = useNavigate();

    const resolvePath = useResolvedPath(to);
    const match = useMatch({ path: resolvePath.pathname, end: false});

    const handleClick = () => {
        navigate(to);
        // Se undefined executa a função
        onClick?.();
    };

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label}/>
        </ListItemButton>
    );
};

interface ILateralMenu {
    children: React.ReactNode;
}

export const LateralMenu: React.FC<ILateralMenu> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    const { isMenuOpen, changeMenuOpen, menuOptions } = useMenuContext();
    const { changeTheme } = useAppThemeContext();
    const { logout } = useAuthContext();

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
                            {menuOptions.map((menuOption, index) => (
                                <ListItemMenu
                                    key={index}
                                    icon={menuOption.icon}
                                    to={menuOption.to}
                                    label={menuOption.label}
                                    onClick={smDown ? changeMenuOpen : undefined} 
                                />
                            ))}
                        </List>
                    </Box>

                    <Box>
                        <List component='nav'>
                            <ListItemButton onClick={changeTheme}>
                                <ListItemIcon>
                                    <Icon>dark_mode</Icon>
                                </ListItemIcon>
                                <ListItemText primary="Alternar Theme"/>
                            </ListItemButton>
                        </List>

                        <List component='nav'>
                            <ListItemButton onClick={logout}>
                                <ListItemIcon>
                                    <Icon>logout</Icon>
                                </ListItemIcon>
                                <ListItemText primary="Sair"/>
                            </ListItemButton>
                        </List>
                    </Box>

                </Box>

            </Drawer>

            <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>{children}</Box>
        </>
    );
};