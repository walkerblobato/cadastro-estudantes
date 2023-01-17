import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

import { ToolbarList } from '../../shared/components';
import { LayoutPage } from '../../shared/layouts';
import { CitiesService } from '../../shared/services/api/cities/CitiesService';
import { PeopleService } from '../../shared/services/api/people/PeopleService';

export const Main = () => {
    const [isLoadingCities, setIsLoadingCities] = useState(true);
    const [totalCountCities, setTotalCountCities] = useState(0);
    const [isLoadingPeople, setIsLoadingPeople] = useState(true);
    const [totalCountPeople, setTotalCountPeople] = useState(0);

    useEffect(() => {
        setIsLoadingCities(true);
        setIsLoadingPeople(true);

        CitiesService.getAll()
            .then((result) => {
                setIsLoadingCities(false);

                if (result instanceof Error) {
                    alert(result.message);
                    return;
                } else {
                    setTotalCountCities(result.totalCount);
                }
            });
        
        PeopleService.getAll()
            .then((result) => {
                setIsLoadingPeople(false);

                if (result instanceof Error) {
                    alert(result.message);
                    return;
                } else {
                    setTotalCountPeople(result.totalCount);
                }
            });

    }, []);

    return (
        <LayoutPage 
            title='Página Inicial' 
            toolbar={<ToolbarList showNewButton={false} />}
        >
            <Box width='100%' display='flex'>
                <Grid container margin={2}>
                    <Grid item container spacing={2}>

                        <Grid item xs={12} md={6} lg={4} xl={3}>
                            <Card>
                                <CardContent>

                                    <Typography variant='h5' align='center'>
                                        Total de pessoas
                                    </Typography>

                                    <Box 
                                        padding={6} 
                                        display='flex' 
                                        justifyContent='center' 
                                        alignItems='center'
                                    >
                                        {!isLoadingPeople && (
                                            <Typography variant='h1'>
                                                {totalCountPeople}
                                            </Typography>
                                        )}

                                        {isLoadingPeople && (
                                            <Typography variant='h3'>
                                                Carregando...
                                            </Typography>
                                        )}
                                    </Box>

                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4} xl={3}>
                            <Card>
                                <CardContent>

                                    <Typography variant='h5' align='center'>
                                        Total de cidades
                                    </Typography>

                                    <Box 
                                        padding={6} 
                                        display='flex' 
                                        justifyContent='center' 
                                        alignItems='center'
                                    >
                                        {!isLoadingCities && (
                                            <Typography variant='h1'>
                                                {totalCountCities}
                                            </Typography>
                                        )}

                                        {isLoadingCities && (
                                            <Typography variant='h3'>
                                                Carregando...
                                            </Typography>
                                        )}
                                    </Box>

                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>
                </Grid>
            </Box>
        </LayoutPage>
    );
};