import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import { SoftTheme, DarkTheme } from './../themes';

interface IThemeContextData {
    themeName: 'soft' | 'dark';
    changeTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
}

interface IAppThemeProvider {
    children: React.ReactNode;
}

export const AppThemeProvider: React.FC<IAppThemeProvider> = ({ children }) => {
    const [themeName, setThemeName ] = useState<'soft' | 'dark'>('soft');

    const changeTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'soft' ? 'dark' : 'soft')
    }, []);

    const theme = useMemo(() => {
        if (themeName === 'soft') return SoftTheme;

        return DarkTheme;
    }, [themeName])

    return (
        <ThemeContext.Provider value={{ themeName, changeTheme }}>
            <ThemeProvider theme={theme}>
                <Box 
                    width="100vw" 
                    height="100vh" 
                    bgcolor={theme.palette.background.default}
                >
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}
