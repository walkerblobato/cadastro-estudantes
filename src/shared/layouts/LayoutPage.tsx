import { ReactNode } from 'react';
import { Typography, useTheme, IconButton, Icon, useMediaQuery, Theme } from '@mui/material';
import { Box } from '@mui/system';
import { useMenuContext } from '../contexts';

interface ILayoutPage {
    title: string;
    children: ReactNode;
    toolbar?: ReactNode;
}
export const LayoutPage: React.FC<ILayoutPage> = ({ title, children, toolbar }) => {
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const theme = useTheme();

    const { changeMenuOpen } = useMenuContext();

    return (
        <Box 
            height='100%' 
            display='flex' 
            flexDirection='column' 
            gap={1}
        >
            <Box 
                padding={1} 
                height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
                display='flex'
                alignItems = 'center'
                gap={1}
            >
                {smDown && (
                    <IconButton onClick={changeMenuOpen}> 
                        <Icon>menu</Icon>
                    </IconButton>
                )}

                <Typography 
                    variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
                    whiteSpace='nowrap'
                    overflow='hidden'
                    textOverflow='ellipses'
                >
                    {title}
                </Typography>
            </Box>

            {toolbar && ( 
                <Box>
                    {toolbar}
                </Box>
            )}

            <Box flex={1} overflow='auto'>
                {children}
            </Box>
        </Box>
    );
};