import { LinearProgress, TextField } from '@mui/material';
import { Form } from '@unform/web';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ToolbarDetails } from '../../shared/components';
import { VTextField } from '../../shared/forms';
import { LayoutPage } from '../../shared/layouts';
import { PeopleService } from '../../shared/services/api/pessoas/PeopleService';


export const DetailsPeople: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true);

            PeopleService.getById(Number(id))
            .then((result) => {
                setIsLoading(false);
                
                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/pessoas');
                } else {
                    setName(result.nomeCompleto);

                    console.log(result);
                }
            });
        }
    }, [id]);

    const handleSave = () => {
        console.log('Save');
    };

    const handleDelete = (id: number) => {
        if (confirm('Realmente deseja apagar?')) {
            PeopleService.deleteById(id)
            .then(result => {
                if (result instanceof Error) {
                    alert(result.message);
                } else {                 
                    alert('Registro apagado com sucesso!');

                    navigate('/pessoas');
                }
            });
        }
    };

    return (
        <LayoutPage
            title={id === 'nova' ? 'Nova pessoa' : name}
            toolbar={
                <ToolbarDetails
                    newButtonText='Nova'
                    showSaveCloseButton
                    showNewButton={id !== 'nova'}
                    showDeleteButton={id !== 'nova'}

                    clickSaveButton={handleSave}
                    clickSaveCloseButton={handleSave}
                    clickDeleteButton={() => handleDelete(Number(id))}
                    clickBackButton={() => navigate('/pessoas')}
                    clickNewButton={() => navigate('/pessoas/detalhe/nova')}
                />
            }
        >
            
            <Form onSubmit={(dados) => console.log(dados)}>
                <VTextField 
                    name='nomeCompleto'
                />

                <button type='submit'>Submit</button>
            </Form>

        </LayoutPage>
    );
};