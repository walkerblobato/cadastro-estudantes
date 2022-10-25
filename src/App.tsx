import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { LateralMenu } from './shared/components';
import { AppThemeProvider } from './shared/contexts/ThemeContext';


export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>

        <LateralMenu>
          <AppRoutes />
        </LateralMenu>

      </BrowserRouter>
    </AppThemeProvider>
  );
};

export default App;
