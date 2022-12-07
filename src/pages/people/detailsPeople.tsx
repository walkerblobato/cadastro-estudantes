import { useNavigate, useParams } from 'react-router-dom';
import { ToolbarDetails } from '../../shared/components';
import { LayoutPage } from '../../shared/layouts';


export const DetailsPeople: React.FC = () => {
    const { id = 'nova'} = useParams<'id'>();
    const navigate = useNavigate();

    const handleSave = () => {
        console.log('Save');
    };

    const handleDelete = () => {
        console.log('Delete');
    };

    return (
        <LayoutPage
            title='Detalhe de pessoa'
            toolbar={
                <ToolbarDetails 
                    newButtonText='Nova'
                    showSaveCloseButton
                    showNewButton={id !== 'nova'}
                    showDeleteButton={id !== 'nova'}

                    clickSaveButton={handleSave}
                    clickSaveCloseButton={handleSave}
                    clickDeleteButton={handleDelete}
                    clickBackButton={() => navigate('/pessoas')}
                    clickNewButton={() => navigate('/pessoas/detalhe/nova')}
                />
            }
        >
            <p>DetalheDePessoas {id}</p>
        </LayoutPage>
    );
};