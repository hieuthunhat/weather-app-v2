import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    styled,
    Typography
} from "@mui/material";

const WarningDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(3),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1.5),
    },
}));

function MediaModal() {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <WarningDialog
            onClose={handleClose}
            aria-labelledby="warning-dialog-title"
            open={open}
        >
            <DialogTitle
                sx={{m: 0, p: 2, display: 'flex', alignItems: 'center', gap: 1, color: 'warning.main'}}
                id="warning-dialog-title"
            >
                Warning
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                X
            </IconButton>
            <DialogContent dividers>
                <Typography gutterBottom>
                    This feature is supposed to display on large screen to bring best experience.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="contained" color="warning">
                    Got it
                </Button>
            </DialogActions>
        </WarningDialog>
    );
}

export default MediaModal;
