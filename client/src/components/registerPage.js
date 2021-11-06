import $ from "jquery";
import React from "react";
import {Box, Container, Divider, TextField, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {Link} from "react-router-dom";
import * as config from "../config"
import {checkEmailFormat} from "../utils";
import AlertToast from "./alertToast";
import VerificationCodeInput from "./verificationCodeInput";


class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            verPassword: "",
            sessionID: "",
            verCode: "",

            alertMessage: "",
            showAlert: false,

            buttonLoading: false,
            emailError: false,
            passwordError: false,
            verPasswordError: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        // Let the register button buttonLoading
        this.setState({
            emailError: false,
            passwordError: false,
            verPasswordError: false,
        });

        let url = config.baseUrl + config.api.account.register;
        let data = {
            email: this.state.email,
            password: this.state.password,
            verCode: this.state.verCode,
            sessionID: this.state.sessionID,
        };

        // Check email address
        if (!this.checkEmail(data.email)) {
            this.showAlert("Invalid email format.")
            return;
        }

        // Check password length
        let testFail = data.password.length < 8;
        this.setState({passwordError: testFail});
        if (testFail) {
            this.showAlert("Password should be at least 8 characters long.")
            return;
        }

        // Check password verification field
        testFail = data.password !== this.state.verPassword;
        this.setState({passwordError: testFail, verPasswordError: testFail});
        if (testFail) {
            this.showAlert("Passwords mismatch.");
            return;
        }

        // If all fields are OK, trigger loading animation of register button.
        this.setState({
            buttonLoading: true,
        });

        // TODO: wait for backend API implementation
        $.post(url, data, function (data, status, jqXHR) {
            console.log(data);
            console.log(status);
            console.log(jqXHR);
        }, "json")
            .always(() => this.setState({buttonLoading: false}))
            .fail(() => {
                this.showAlert("Failed to connect to the server.");
            });
    }

    handleChange(event) {
        // Update this.state when user-input text changes
        let val = event.target.value;
        let name = event.target.name;

        this.setState({[name]: val});
    }

    /*
    * Check if the input email is valid, and update this.state.emailError.
    * */
    checkEmail(email) {
        let res = checkEmailFormat(email);
        this.setState({emailError: !res});
        return res;
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
                    Register
                </Typography>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    error={this.state.emailError}
                    name="email"
                    label="Email"
                    // type="email"
                    onChange={this.handleChange}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    error={this.state.passwordError}
                    name="password"
                    label="Password"
                    type="password"
                    onChange={this.handleChange}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    error={this.state.verPasswordError}
                    name="verPassword"
                    label="Confirm Password"
                    type="password"
                    onChange={this.handleChange}
                />

                <VerificationCodeInput onChange={this.handleChange}
                                       email={this.state.email}
                                       checkEmailCallback={this.checkEmail}/>

                <Box width={1}
                     sx={{
                         display: "flex",
                         flexDirection: "row",
                         alignItems: "center",
                         justifyContent: "space-evenly",
                         mt: 1
                     }}>
                    <Box width={0.4} sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end"
                    }}>
                        <LoadingButton
                            margin="normal"
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{mt: 2, mb: 2}}
                            loading={this.state.buttonLoading}
                        >
                            <Typography variant="h6">Register</Typography>
                        </LoadingButton>
                    </Box>

                    <Divider orientation="vertical" flexItem
                             sx={{borderRightWidth: 3, ml: 1, mr: 1, mt: 1, mb: 1}}/>

                    <Box width={0.4} sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start"
                    }}>
                        <Typography variant="h6">
                            or back to&nbsp;
                            <Link to="/login">
                                login
                            </Link>
                        </Typography>
                    </Box>
                </Box>

                <AlertToast alertMessage={this.state.alertMessage} showAlert={this.state.showAlert}
                            onClose={() => this.setState({showAlert: false})}/>
            </Box>
        );
    }
}


export default class RegisterPage extends React.Component {
    render() {
        return (
            <Container maxWidth="sm">
                <RegisterForm/>
            </Container>
        );
    }
}
