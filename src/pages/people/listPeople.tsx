import { useMemo, useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

import { IPeopleList, PeopleService } from '../../shared/services/api/pessoas/PeopleService';
import { useSearchParams } from 'react-router-dom';
import { ToolbarList } from '../../shared/components';
import { LayoutPage } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';



export const ListPeople = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [rows, setRows] = useState<IPeopleList[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const { debounce } = useDebounce(1500);

    const search = useMemo(() => {
        return searchParams.get('search') || '';
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            PeopleService.getAll(1, search)
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

    }, [search]);
    
    return (
        <LayoutPage 
            title='Listagem de pessoas'
            toolbar={
                <ToolbarList
                    showSearchInput 
                    newButtonText='Nova'
                    searchText={search}
                    // { replace: true} impede que o react router dom fique registrando várias buscas no navegador
                    changeSearchText={text => setSearchParams({ search: text }, { replace: true })}
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
                                <TableCell>Ações</TableCell>
                                <TableCell>{row.nomeCompleto}</TableCell>
                                <TableCell>{row.escola}</TableCell>
                                <TableCell>{row.curso}</TableCell>
                                <TableCell>{row.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </LayoutPage>
    );
};