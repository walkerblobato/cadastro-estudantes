import { Box, Paper, Grid, Typography, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { ToolbarDetails } from '../../shared/components';
import { VTextField, VForm, useVForm, IVFormErros } from '../../shared/forms';
import { LayoutPage } from '../../shared/layouts';
import { PeopleService } from '../../shared/services/api/people/PeopleService';
import { AutocompleteCity } from './components/AutocompleteCity';

interface IFormData {
    email: string;
    cidadeId: number;
    nomeCompleto: string;
    escola: string;
    curso: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    email: yup.string().required().email(),
    cidadeId: yup.number().integer().required(),
    nomeCompleto: yup.string().required().min(3),
    escola: yup.string().required().min(3),
    curso: yup.string().required().min(3),
});

export const DetailsPeople: React.FC = () => {
    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

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

                        formRef.current?.setData(result);
                    }
                });
        } else {
            formRef.current?.setData({
                email: '',
                nomeCompleto: '',
                escola: '',
                curso: '',
                cidadeId: undefined
            });
        }
    }, [id]);

    const handleSave = (data: IFormData) => {
        formValidationSchema.
            validate(data, { abortEarly: false })
            .then((validateData) => {
                setIsLoading(true);

                if (id === 'nova') {
                    PeopleService
                        .create(validateData)
                        .then((result) => {
                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose()) {
                                    navigate('/pessoas');
                                } else {
                                    navigate(`/pessoas/detalhe/${result}`);
                                }
                            }
                        });
                } else {
                    PeopleService
                        .updateById(Number(id), { id: Number(id), ...validateData })
                        .then((result) => {
                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose()) {
                                    navigate('/pessoas');
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

                    clickSaveButton={save}
                    clickDeleteButton={() => handleDelete(Number(id))}
                    clickBackButton={() => navigate('/pessoas')}
                    clickNewButton={() => navigate('/pessoas/detalhe/nova')}
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
                                    label="Nome completo" 
                                    name='nomeCompleto'       
                                    disabled={isLoading}
                                    onChange={e => setName(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction='row'>
                            <Grid item xs={12} lg={6}>
                                <VTextField 
                                    fullWidth 
                                    label="Ecola" 
                                    name='escola'
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction='row'>
                            <Grid item xs={12} lg={6}>
                                <VTextField 
                                    fullWidth 
                                    label="Curso" 
                                    name='curso'
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction='row'>
                            <Grid item xs={12} lg={6}>
                                <VTextField 
                                    fullWidth 
                                    label="Email" 
                                    name='email'
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item direction='row'>
                            <Grid item xs={12} lg={6}>
                                <AutocompleteCity isExternalLoading={isLoading} />
                            </Grid>
                        </Grid>

                    </Grid>
                                 
                </Box> 
            </VForm>

        </LayoutPage>
    );
};