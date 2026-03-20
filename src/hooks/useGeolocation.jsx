import {useState} from "react";
import {Alert, Snackbar} from "@mui/material";

export const useGeolocation = ({successCallback, failCallback}) => {
    const [toast, setToast] = useState({open: false, message: '', severity: 'info'});

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setToast({open: true, message: 'Get location successfully', severity: 'success'});
                    successCallback(position);
                },
                (error) => {
                    setToast({open: true, message: 'Get location unsuccessfully', severity: 'error'});
                    failCallback(error);
                }
            );
        } else {
            setToast({open: true, message: 'Geolocation is not supported by this browser', severity: 'error'});
        }
    }

    const ToastComponent = (
        <Snackbar
            open={toast.open}
            autoHideDuration={3000}
            onClose={() => setToast(prev => ({...prev, open: false}))}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
            <Alert severity={toast.severity} variant="filled">
                {toast.message}
            </Alert>
        </Snackbar>
    );

    return {getLocation, ToastComponent};
}