import { ToolbarDetails, ToolbarList } from '../../shared/components';
import { LayoutPage } from '../../shared/layouts';

export const Main = () => {
    return (
        <LayoutPage 
            title='Página Inicial' 
            toolbar={(
                <ToolbarDetails />
                )}
        >
            Testando
        </LayoutPage>
    );
};