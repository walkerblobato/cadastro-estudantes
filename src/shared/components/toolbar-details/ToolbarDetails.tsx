import { Box, Paper, useTheme, Button, Icon, Divider, Skeleton, Typography, useMediaQuery, Theme } from '@mui/material';


interface IToolbarDetailsProps {
    newButtonText?: string;
    
    showNewButton?: boolean;
    showBackButton?: boolean;
    showDeleteButton?: boolean;
    showSaveButton?: boolean;
    showSaveCloseButton?: boolean;

    showSaveButtonLoading?: boolean;
    showBackButtonLoading?: boolean;
    showDeleteButtonLoading?: boolean;
    showNewButtonLoading?: boolean;
    showSaveCloseButtonLoading?: boolean;

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

    showSaveButtonLoading = false,
    showBackButtonLoading = false,
    showDeleteButtonLoading = false,
    showNewButtonLoading = false,
    showSaveCloseButtonLoading = false,

    clickNewButton,
    clickBackButton,
    clickDeleteButton,
    clickSaveButton,
    clickSaveCloseButton,
}) => {
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
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
            {(showSaveButton && !showSaveButtonLoading) && (
                <Button
                    color='primary'
                    variant='contained'
                    disableElevation
                    startIcon={<Icon>save</Icon>}
                    onClick={clickSaveButton}
                >
                    <Typography 
                        variant='button' whiteSpace='nowrap'
                        textOverflow='ellipsis'
                        overflow='hidden'
                    >
                        Salvar
                    </Typography>
                </Button>
            )}
            
            {showSaveButtonLoading && (
                <Skeleton width={110} height={60}/>
            )}

            {(showSaveCloseButton && !showSaveCloseButtonLoading && !smDown && !mdDown) && (
                <Button
                    color='primary'
                    variant='outlined'
                    disableElevation
                    startIcon={<Icon>save</Icon>}
                    onClick={clickSaveCloseButton}
                >
                    <Typography
                        variant='button' whiteSpace='nowrap'
                        textOverflow='ellipsis'
                        overflow='hidden'
                    >
                        Salvar e Voltar
                    </Typography>
                </Button>
            )}

            {showSaveCloseButtonLoading && !smDown && (
                <Skeleton width={180} height={60}/>
            )}
                
            {(showDeleteButton && !showDeleteButtonLoading) && (
                <Button
                    color='primary'
                    variant='outlined'
                    disableElevation
                    startIcon={<Icon>delete</Icon>}
                    onClick={clickDeleteButton}
                >
                    <Typography
                        variant='button' whiteSpace='nowrap'
                        textOverflow='ellipsis'
                        overflow='hidden'
                    >
                        Apagar
                    </Typography>
                </Button>
            )}
            
            {showDeleteButtonLoading && (
                <Skeleton width={110} height={60}/>
            )}

            {(showNewButton && !showNewButtonLoading && !smDown) && (
                <Button
                    color='primary'
                    variant='outlined'
                    disableElevation
                    startIcon={<Icon>add</Icon>}
                    onClick={clickNewButton}
                >
                    <Typography
                        variant='button' whiteSpace='nowrap'
                        textOverflow='ellipsis'
                        overflow='hidden'
                    >
                        {newButtonText}
                    </Typography>
                </Button>
            )}
            
            {showNewButtonLoading && !smDown && (
                <Skeleton width={110} height={60}/>
            )}

            {
                (showBackButton && 
                    (showNewButton || showDeleteButton || showSaveButton || showSaveCloseButton)
                ) && (
                    <Divider variant='middle' orientation='vertical'/>
            )}

            {(showBackButton && !showBackButtonLoading) && (
                <Button
                    color='primary'
                    variant='outlined'
                    disableElevation
                    startIcon={<Icon>arrow_back</Icon>}
                    onClick={clickBackButton}
                >
                    <Typography
                        variant='button' whiteSpace='nowrap'
                        textOverflow='ellipsis'
                        overflow='hidden'
                    >
                        Voltar
                    </Typography>
                </Button>
            )}
            
            {showBackButtonLoading && (
                <Skeleton width={110} height={60}/>
            )}

        </Box>
    );
};