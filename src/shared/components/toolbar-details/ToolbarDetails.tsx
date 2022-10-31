import { Box, Paper, useTheme, Button, Icon, Divider } from '@mui/material';


export const ToolbarDetails: React.FC = () => {
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
            <Button
                color='primary'
                variant='contained'
                disableElevation
                startIcon={<Icon>save</Icon>}
            >
                Salvar
            </Button>
            <Button
                color='primary'
                variant='outlined'
                disableElevation
                startIcon={<Icon>save</Icon>}
            >
                Salvar e Voltar
            </Button>
            <Button
                color='primary'
                variant='outlined'
                disableElevation
                startIcon={<Icon>delete</Icon>}
            >
                Apagar
            </Button>
            <Button
                color='primary'
                variant='outlined'
                disableElevation
                startIcon={<Icon>add</Icon>}
            >
                Novo
            </Button>

            <Divider variant='middle' orientation='vertical'/>

            <Button
                color='primary'
                variant='outlined'
                disableElevation
                startIcon={<Icon>arrow_back</Icon>}
            >
                Voltar
            </Button>
        </Box>
    );
};