import $ from "jquery"
import React from "react";
import {Alert, Box, Button, Container, Divider, Modal, Snackbar, TextField, Typography} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import * as config from "../config"
import {Link} from "react-router-dom";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            loading: false,
            showAlert: false,
            alertMessage: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseAlert = this.handleCloseAlert.bind(this);
    }

    handleChange(event) {
        // Update this.state when user-input text changes
        let val = event.target.value;
        let name = event.target.name;

        this.setState({[name]: val});
    }

    handleSubmit(event) {
        // Submit the email & password to the server to login
        event.preventDefault();

        // Let the login button loading
        this.setState({loading: true});

        let url = config.baseUrl + config.api.account.login;
        let data = {email: this.state.email, password: this.state.password}

        // Check password length
        if (data.password.length < 8) {
            this.triggerAlert("Password should be at least 8 characters long.");
            this.setState({loading: false});
            return;
        }

        // TODO: wait for backend api
        $.post(url, data, function (data, status, jqXHR) {
            console.log(data);
            console.log(status);
            console.log(jqXHR)
        }, "json")
            .always(() => {
                this.setState({loading: false});
            })
            .fail(() => {
                this.triggerAlert("Failed to connect to the server.");
            });
    }

    triggerAlert(msg) {
        // Display an alert
        this.setState({
            showAlert: true,
            alertMessage: msg.toString(),
        });
    }

    handleCloseAlert(event, reason) {
        if (reason === "clickaway") return;
        this.setState({showAlert: false, alertMessage: ""});
    }

    render() {
        return (
            <Box
                component="form"
                onSubmit={this.handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h3" sx={{mt: 10, mb: 2}}>
                    Login
                </Typography>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    onChange={this.handleChange}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    onChange={this.handleChange}
                />

                <Box
                    width={1}
                    sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly"}}>

                    <Box width={0.4} sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end"
                    }}>
                        <LoadingButton
                            // margin="normal"
                            type="submit"
                            variant="contained"
                            sx={{mt: 2, mb: 2}}
                            loading={this.state.loading}
                        >
                            <Typography variant="h6">Login</Typography>
                        </LoadingButton>
                    </Box>

                    <Divider orientation="vertical" flexItem
                             sx={{borderRightWidth: 3, ml: 1, mr: 1, mt: 1, mb: 1, justifySelf: "center"}}/>

                    <Box width={0.4} sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start"
                    }}>
                        <Typography variant="h6">
                            or&nbsp;
                            <Link to="./register">
                                register
                            </Link>
                            &nbsp;now
                        </Typography>
                    </Box>
                </Box>

                <Snackbar
                    open={this.state.showAlert}
                    autoHideDuration={3000}
                    onClose={this.handleCloseAlert}
                    anchorOrigin={{vertical: "top", horizontal: "center"}}
                >
                    <Alert severity="error">
                        {this.state.alertMessage}
                    </Alert>
                </Snackbar>

                <ResetPassword/>
            </Box>
        );
    }
}


class ResetPassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
        this.toggleOpen = this.toggleOpen.bind(this);
    }

    toggleOpen() {
        this.setState((prev) => {
            return {open: !prev.open};
        })
    }

    render() {
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        };

        return (
            <div>
                <Typography variant="h6">
                    <Button variant="text" onClick={this.toggleOpen}>
                        Forget password?
                    </Button>
                </Typography>
                <Modal
                    open={this.state.open}
                    onClose={this.toggleOpen}
                >
                    <Box sx={style}>
                        <Typography>
                            TODO: Reset Password Overlay
                        </Typography>
                    </Box>
                </Modal>
            </div>
        );
    }
}


export default function LoginPage() {
    return (
        <Container maxWidth="sm">
            <LoginForm/>
        </Container>
    );
}
