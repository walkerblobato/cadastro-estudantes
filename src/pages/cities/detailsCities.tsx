import { Box, Paper, Grid, Typography, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { ToolbarDetails } from '../../shared/components';
import { VTextField, VForm, useVForm, IVFormErros } from '../../shared/forms';
import { LayoutPage } from '../../shared/layouts';
import { CitiesService } from '../../shared/services/api/cities/CitiesService';

interface IFormData {
    nome: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    nome: yup.string().required().min(3),
});

export const DetailsCities: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if (id !== 'nova') {
            setIsLoading(true);

            CitiesService.getById(Number(id))
                .then((result) => {
                    setIsLoading(false);
                    
                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/cidades');
                    } else {
                        setName(result.nome);

                        formRef.current?.setData(result);
                    }
                });
        } else {
            formRef.current?.setData({
                nome: '',
            });
        }
    }, [id]);

    const handleSave = (data: IFormData) => {
        formValidationSchema.
            validate(data, { abortEarly: false })
            .then((validateData) => {
                setIsLoading(true);

                if (id === 'nova') {
                    CitiesService
                        .create(validateData)
                        .then((result) => {
                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose()) {
                                    navigate('/cidades');
                                } else {
                                    navigate(`/cidades/detalhe/${result}`);
                                }
                            }
                        });
                } else {
                    CitiesService
                        .updateById(Number(id), { id: Number(id), ...validateData })
                        .then((result) => {
                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose()) {
                                    navigate('/cidades');
                                }
                            }
                        });
                }
            })
            .catch((error: yup.ValidationError) => {
                const validationErrors: IVFormErros = {};
                
                error.inner.forEach(error => {
                    if (!error.path) return;

                    validationErrors[error.path] = error.message;
                });

                console.log(validationErrors);
                formRef.current?.setErrors(validationErrors);
            });       
    };

    const handleDelete = (id: number) => {
        if (confirm('Realmente deseja apagar?')) {
            CitiesService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {                 
                        alert('Registro apagado com sucesso!');

                        navigate('/cidades');
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

                    clickSaveButton={save}
                    clickDeleteButton={() => handleDelete(Number(id))}
                    clickBackButton={() => navigate('/cidades')}
                    clickNewButton={() => navigate('/cidades/detalhe/nova')}
                    clickSaveCloseButton={saveAndClose}
                />
            }
        >
            
            <VForm ref={formRef} onSubmit={handleSave}>
                <Box 
                    margin={1} 
                    display='flex' 
                    flexDirection='column' 
                    component={Paper} 
                    variant='outlined'
                >
                    <Grid 
                        container 
                        direction='column' 
                        padding={2}
                        spacing={2}
                    >

                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant='indeterminate' />
                            </Grid>
                        )}

                        <Grid item>
                            <Typography variant='h6'>Geral</Typography>
                        </Grid>

                        <Grid container item direction='row'>
                            <Grid item xs={12} lg={6}>
                                <VTextField
                                    fullWidth 
                                    label="Nome" 
                                    name='nome'       
                                    disabled={isLoading}
                                    onChange={e => setName(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                    </Grid>             
                </Box> 
            </VForm>

        </LayoutPage>
    );
};