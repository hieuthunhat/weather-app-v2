import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled, Typography} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function MediaModal() {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Modal title
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
                    This feature is supposed to display on large screen to bring best experience
                </Typography>
            </DialogContent>
        </BootstrapDialog>
    );
}

export default MediaModal;