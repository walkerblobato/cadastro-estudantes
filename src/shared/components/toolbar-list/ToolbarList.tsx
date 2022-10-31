import { Box, TextField, Button, Paper, useTheme, Icon } from '@mui/material';

interface ToolbarListProps {
    searchText?: string;
    showSearchInput?: boolean;
    changeSearchText?: (newText: string) => void;
    newButtonText?: string;
    showNewButtonText?: boolean;
    clickNewButton?: () => void;
}
export const ToolbarList: React.FC<ToolbarListProps> = ({
    searchText = '',
    showSearchInput = false,
    changeSearchText,
    newButtonText = 'Novo',
    showNewButtonText = true,
    clickNewButton,
}) => {
    const theme = useTheme();

    return (
        <Box 
            component={Paper}
            height={theme.spacing(5)}
            marginX={1}
            padding={1}
            paddingX={2}
            gap={1}
            display='flex'
            alignItems='Center'
        >
            {showSearchInput && (
                <TextField 
                size='small' 
                placeholder='Pesquisar...'
                value={searchText}
                // Por causa do ?. só vai executar a função se ela não for underfined
                onChange={(e) => changeSearchText?.(e.target.value)}
            />
            )}
            <Box 
                flex={1} 
                display='flex' 
                justifyContent='end'
            >
                {showNewButtonText && (
                    <Button
                        color='primary'
                        variant='contained'
                        disableElevation
                        endIcon={<Icon>add</Icon>}
                        onClick={clickNewButton}
                    >
                        {newButtonText}
                    </Button>
                )}
            </Box>
        </Box>
    );
};