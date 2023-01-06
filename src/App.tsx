import { BrowserRouter } from 'react-router-dom';

import './shared/forms/TranslateYup';

import { AppRoutes } from './routes';
import { LateralMenu } from './shared/components';
import { AppThemeProvider, MenuProvider } from './shared/contexts';


export const App = () => {
  return (
    <AppThemeProvider>
      <MenuProvider>
        <BrowserRouter>

          <LateralMenu>
            <AppRoutes />
          </LateralMenu>

        </BrowserRouter>
      </MenuProvider>
    </AppThemeProvider>
  );
};

export default App;
