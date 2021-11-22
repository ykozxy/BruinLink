import $ from "jquery"
import React from "react";
import {Box, Button, Container, Divider, TextField, Typography} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import * as config from "../config"
import {Link} from "react-router-dom";
import AlertToast from "./alertToast"
import ResetPasswordOverlay from "./resetPasswordOverlay";
import {checkEmailFormat} from "../utils";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            loading: false,
            showAlert: false,
            alertMessage: "",
            emailError: false,
            passwordError: false,
            openPopup: false,
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

    /*
    * Submit the email & password to the server
    * */
    handleSubmit(event) {
        event.preventDefault();

        // Let the login button buttonLoading
        this.setState({
            emailError: false,
            passwordError: false,
        });

        let url = config.baseUrl + config.api.account.login;
        let data = {email: this.state.email, password: this.state.password}

        let testFail = !checkEmailFormat(data.email);
        this.setState({emailError: testFail});
        if (testFail) {
            this.showAlert("Invalid Email format");
            return;
        }

        // Check password length
        testFail = data.password.length < 8;
        this.setState({passwordError: testFail})
        if (testFail) {
            this.showAlert("Password should be at least 8 characters long.");
            return;
        }

        // If all fields are OK, trigger loading animation of register button.
        this.setState({loading: true});

        // TODO: wait for backend API implementation
        $.post(url, data, "json")
            .always(() => {
                this.setState({loading: false});
            })
            .fail(() => {
                this.showAlert("Failed to connect to the server.");
            })
            .done((data) => {
                console.log(data);
                if (data.status === "failed") {
                    this.showAlert("Incorrect email or password.")
                }
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
                    height: "90vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h3" sx={{mt: 10, mb: 2}}>
                    Login
                </Typography>

                <TextField
                    margin="normal"
                    error={this.state.emailError}
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    // type="email"
                    autoComplete="email"
                    onChange={this.handleChange}
                />

                <TextField
                    margin="normal"
                    error={this.state.passwordError}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
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

                <Typography variant="h6">
                    <Button variant="text" onClick={() => this.setState({openPopup: true})}>
                        Forget password?
                    </Button>
                </Typography>

                <ResetPasswordOverlay
                    open={this.state.openPopup}
                    onClose={() => this.setState({openPopup: false})}
                />
            </Box>
        );
    }
}


export default class LoginPage extends React.Component {
    render() {
        return (
            <Container maxWidth="sm">
                <LoginForm/>
            </Container>
        );
    }
}
