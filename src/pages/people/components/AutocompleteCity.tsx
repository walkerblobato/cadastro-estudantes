import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import { useField } from '@unform/core';

import { useDebounce } from '../../../shared/hooks';
import { CitiesService } from '../../../shared/services/api/cities/CitiesService';


type TAutocompleteOption = {
    id: number;
    label: string;
}

interface IAutoCompleteCityProps {
    isExternalLoading: boolean
}

export const AutocompleteCity: React.FC<IAutoCompleteCityProps> = ({ isExternalLoading = false}) => {
    const { fieldName, registerField, defaultValue, error, clearError } = useField('cidadeId');
    const { debounce } = useDebounce();
    
    const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

    const [options, setOptions] = useState<TAutocompleteOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    
    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            CitiesService.getAll(1, search)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        // alert(result.message);
                        return;
                    }
                    
                    setOptions(result.data.map(city => ({ id: city.id, label: city.nome })));
                });
        });
    }, [search]);

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newSelectedId) => setSelectedId(newSelectedId)
        });
 
    }, [registerField, fieldName, selectedId]);

    const autoCompleteSelectedOption = useMemo(() => {
        if (!selectedId) return null;

        const selectedOption = options.find(option => option.id === selectedId);

        if (!selectedOption) return null;

        return selectedOption;
    }, [selectedId, options]);
    return (
        <Autocomplete
            openText='Abrir'
            closeText='Fechar'
            noOptionsText='Sem opções'
            loadingText='Carregando...'

            disablePortal
            
            options ={options}
            loading={isLoading}
            disabled={isExternalLoading}
            value={autoCompleteSelectedOption}
            onInputChange={(_, newValue) => setSearch(newValue)}  
            onChange={(_, newValue) => { setSelectedId(newValue?.id); setSearch(''); clearError();}}
            popupIcon={isExternalLoading || isLoading ? <CircularProgress size={28}/> : undefined}
            renderInput={(params) => (
                <TextField
                    {...params}
      
                    label='Cidade' 
                    error={!!error}
                    helperText={error}
                />
            )}
        />
    );
};