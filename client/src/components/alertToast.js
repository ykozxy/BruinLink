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
        // Default: 'error'.
        severity: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
    }

    // Defines prop default values
    static defaultProps = {
        severity: 'error',
    }

    constructor(props) {
        super(props);

        this.handleCloseAlert = this.handleCloseAlert.bind(this);

        this.timer = null;
        this.cooldown = 0;
    }

    handleCloseAlert(event, reason) {
        if (reason === "clickaway") return;
        clearInterval(this.timer);
        this.props.onClose();
    }

    countDown() {
        // Reduce coolDown by 0.1 second
        this.cooldown = this.coolDown - 100;

        if (this.cooldown <= 0) {
            // Cool down finished!
            clearInterval(this.timer);
            this.props.onClose();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.cooldown = 1500;
        clearInterval(this.timer);
        this.timer = setInterval(() => this.countDown(), 100);
    }

    render() {
        return (
            <Portal>
                <Snackbar
                    open={this.props.showAlert}
                    autoHideDuration={1500}
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