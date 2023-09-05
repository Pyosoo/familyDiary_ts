import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { settingAction } from "src/store/reducer/setting/setting";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
    function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    },
);

export default function CustomSnackbar() {
    const dispatch = useDispatch();

    const snackbarData = useSelector(
        (state: RootState) => state.setting.snackbar,
    );

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(
            settingAction.setSnackbar({
                snackbarOpen: false,
                snackbarType: "",
                snackbarMessage: "",
            }),
        );
    };

    return (
        <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snackbarData.snackbarOpen}
                autoHideDuration={1000}
                onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={snackbarData.snackbarType}
                    sx={{ width: "100%" }}>
                    {snackbarData.snackbarMessage}
                </Alert>
            </Snackbar>
            {/* 
            <Alert severity="error">This is an error message!</Alert>
            <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert> 
            */}
        </Stack>
    );
}
