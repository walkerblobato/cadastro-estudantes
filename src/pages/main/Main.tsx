import { Toolbar } from '../../shared/components';
import { LayoutPage } from '../../shared/layouts';

export const Main = () => {
    return (
        <LayoutPage 
            title='Página Inicial' 
            toolbar={(
                <Toolbar 
                    showSearchInput
                />
                )}
        >
            Testando
        </LayoutPage>
    );
};