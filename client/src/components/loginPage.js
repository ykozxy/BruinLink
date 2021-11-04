import $ from "jquery"
import React from "react";
import {Box, Button, Container, Divider, Modal, TextField, Typography} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import * as config from "../config"
import {Link} from "react-router-dom";
import AlertToast from "./alertToast"

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
            this.showAlert("Password should be at least 8 characters long.");
            this.setState({loading: false});
            return;
        }

        // Regex for checking email address.
        // Cited from: https://stackoverflow.com/questions/39356826/how-to-check-if-it-a-text-input-has-a-valid-email-format-in-reactjs/39425165
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(data.email)) {
            this.showAlert("Invalid Email format");
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
                this.showAlert("Failed to connect to the server.");
            });
    }

    showAlert(msg) {
        this.setState({
            showAlert: true,
            alertMessage: msg,
        });
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
                    // type="email"
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

                <AlertToast
                    showAlert={this.state.showAlert}
                    alertMessage={this.state.alertMessage}
                    onClose={() => this.setState({showAlert: false})}
                />

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
