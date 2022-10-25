import { createTheme } from '@mui/material';
import { cyan, orange } from '@mui/material/colors';


export const DarkTheme = createTheme({
    palette: {
        primary: {
            main: orange[500],
            dark: orange[700],
            light: orange[300],
            contrastText: '#ffffff',
        },
        secondary: {
            main: cyan[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: '#ffffff', 
        },
        background: {
            paper: '#303134',
            default: '#202124' ,
        }
    }
});