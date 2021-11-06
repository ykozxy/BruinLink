import React from "react";
import PropTypes from 'prop-types';
import {Alert, Snackbar} from "@mui/material";
import Portal from '@mui/core/Portal';

/*
* Display an alert toast at the top of the screen.
* */
export default class AlertToast extends React.Component {
    // Defines all props
    static propTypes = {
        // Controls if the Toast will be displayed or not
        showAlert: PropTypes.bool.isRequired,
        // Msg of the toast
        alertMessage: PropTypes.string.isRequired,
        // Callback function, should change showAlert to false
        onClose: PropTypes.func.isRequired,
        // One of 'error', 'info', 'success', or 'warning'.
        // Default: 'error'.
        severity: PropTypes.string,
    }

    // Defines prop default values
    static defaultProps = {
        severity: 'error',
    }

    constructor(props) {
        super(props);

        this.handleCloseAlert = this.handleCloseAlert.bind(this);
    }

    handleCloseAlert(event, reason) {
        if (reason === "clickaway") return;
        this.props.onClose();
    }

    render() {
        return (
            <Portal>
                <Snackbar
                    open={this.props.showAlert}
                    autoHideDuration={3000}
                    onClose={this.handleCloseAlert}
                    anchorOrigin={{vertical: "top", horizontal: "center"}}
                >
                    <Alert severity={this.props.severity}>
                        {this.props.alertMessage}
                    </Alert>
                </Snackbar>
            </Portal>
        );
    }
}