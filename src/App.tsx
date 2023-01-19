import { BrowserRouter } from 'react-router-dom';

import './shared/forms/TranslateYup';

import { AppRoutes } from './routes';
import { LateralMenu, Login } from './shared/components';
import { AppThemeProvider, AuthProvider, MenuProvider } from './shared/contexts';


export const App = () => {
  return (
    <AuthProvider>
      <AppThemeProvider>
        
        <Login>

          <MenuProvider>
            <BrowserRouter>

              <LateralMenu>
                <AppRoutes />
              </LateralMenu>

            </BrowserRouter>
          </MenuProvider>
        
        </Login>

      </AppThemeProvider>
    </AuthProvider>
  );
};

export default App;
