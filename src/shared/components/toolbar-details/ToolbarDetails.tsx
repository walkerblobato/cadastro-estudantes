import { Box, Paper, useTheme, Button, Icon, Divider } from '@mui/material';


interface IToolbarDetailsProps {
    newButtonText?: string;
    
    showNewButton?: boolean;
    showBackButton?: boolean;
    showDeleteButton?: boolean;
    showSaveButton?: boolean;
    showSaveCloseButton?: boolean;

    clickNewButton?: () => void;
    clickBackButton?: () => void;
    clickDeleteButton?: () => void;
    clickSaveButton?: () => void;
    clickSaveCloseButton?: () => void;
}

export const ToolbarDetails: React.FC<IToolbarDetailsProps> = ({
    newButtonText = 'Novo',

    showNewButton = true,
    showBackButton = true,
    showDeleteButton = true,
    showSaveButton = true,
    showSaveCloseButton = false,

    clickNewButton,
    clickBackButton,
    clickDeleteButton,
    clickSaveButton,
    clickSaveCloseButton,
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
            {showSaveButton && (
                <Button
                    color='primary'
                    variant='contained'
                    disableElevation
                    startIcon={<Icon>save</Icon>}
                    onClick={clickSaveButton}
                >
                    Salvar
                </Button>
            )}

            {showSaveCloseButton && (
                <Button
                    color='primary'
                    variant='outlined'
                    disableElevation
                    startIcon={<Icon>save</Icon>}
                    onClick={clickSaveCloseButton}
                >
                    Salvar e Voltar
                </Button>
            
            )}
                
            {showDeleteButton && (
                <Button
                    color='primary'
                    variant='outlined'
                    disableElevation
                    startIcon={<Icon>delete</Icon>}
                    onClick={clickDeleteButton}
                >
                    Apagar
                </Button>
            )}

            {showNewButton && (
                <Button
                    color='primary'
                    variant='outlined'
                    disableElevation
                    startIcon={<Icon>add</Icon>}
                    onClick={clickNewButton}
                >
                    {newButtonText}
                </Button>
            )}

            <Divider variant='middle' orientation='vertical'/>

            {showBackButton && (
                <Button
                    color='primary'
                    variant='outlined'
                    disableElevation
                    startIcon={<Icon>arrow_back</Icon>}
                    onClick={clickBackButton}
                >
                    Voltar
                </Button>
            )}
        </Box>
    );
};