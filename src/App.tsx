import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import { SoftTheme } from './shared/themes';
import { AppRoutes } from "./routes";


 export const App = () => {
  return (
    <ThemeProvider theme={SoftTheme}>
      <BrowserRouter>
        <AppRoutes />
       </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
