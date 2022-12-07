import { useMemo, useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, TableFooter, Paper, LinearProgress, Pagination, IconButton, Icon } from '@mui/material';

import { IPeopleList, PeopleService } from '../../shared/services/api/pessoas/PeopleService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToolbarList } from '../../shared/components';
import { LayoutPage } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environment';



export const ListPeople = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [rows, setRows] = useState<IPeopleList[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const { debounce } = useDebounce(1500);

    const search = useMemo(() => {
        return searchParams.get('buscar') || '';
    }, [searchParams]);

    const page = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            PeopleService.getAll(page, search)
            .then((result) => {
                setIsLoading(false);

                if (result instanceof Error) {
                    alert(result.message);
                    return;
                }
                console.log(result);
                
                setRows(result.data);
                setTotalCount(result.totalCount);
            });
        });

    }, [search, page]);

    const handleDelete = (id: number) => {
        if (confirm('Realmente deseja apagar?')) {
            PeopleService.deleteById(id)
            .then(result => {
                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setRows(oldRows => [
                        ...oldRows.filter(oldRow => oldRow.id !== id)
                    ]);
                    
                    alert('Registro apagado com sucesso!');
                }
            });
        }
    };
    
    return (
        <LayoutPage 
            title='Listagem de pessoas'
            toolbar={
                <ToolbarList
                    showSearchInput 
                    newButtonText='Nova'
                    searchText={search}
                    // { replace: true} impede que o react router dom fique registrando várias buscas no navegador
                    changeSearchText={text => setSearchParams({ buscar: text, pagina: '1' }, { replace: true })}
                />
            }
        >
            <TableContainer 
                component={Paper} 
                variant="outlined" 
                sx={{ m: 1, width: 'auto'}}
            >
                <Table>

                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome Completo</TableCell>
                            <TableCell>Escola</TableCell>
                            <TableCell>Curso</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell>
                                <IconButton 
                                    size='small'
                                    onClick={() => handleDelete(row.id)}
                                >
                                    <Icon>delete</Icon>
                                </IconButton>
                                <IconButton 
                                    size='small'
                                    onClick={() => navigate(`/pessoas/detalhe/${row.id}`)}
                                >
                                    <Icon>edit</Icon>
                                </IconButton>
                                </TableCell>
                                <TableCell>{row.nomeCompleto}</TableCell>
                                <TableCell>{row.escola}</TableCell>
                                <TableCell>{row.curso}</TableCell>
                                <TableCell>{row.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    {totalCount === 0 && !isLoading && (
                        <caption>{Environment.LISTAGEM_VAZIA}</caption>
                    )}

                    <TableFooter>
                        {isLoading && (  
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <LinearProgress variant='indeterminate'/>
                                </TableCell>      
                            </TableRow>
                        )}

                        {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (  
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Pagination
                                        page={page} 
                                        count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                                        onChange={(_, newPage) => setSearchParams({ buscar: search, pagina: newPage.toString() }, { replace: true })}
                                    /> 
                                </TableCell>      
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>
        </LayoutPage>
    );
};