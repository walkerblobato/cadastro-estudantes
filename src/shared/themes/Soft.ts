import { createTheme } from '@mui/material';
import { green, cyan, orange } from '@mui/material/colors';


export const SoftTheme = createTheme({
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
            paper: '#ffffff',
            default: '#f7f6f3' ,
        }
    }
})