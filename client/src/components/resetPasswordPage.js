import $ from "jquery"
import React from "react";
import {Box, Container, TextField, Typography} from "@mui/material";
import VerificationCodeInput from "./verificationCodeInput";
import * as config from "../config"
import {checkEmailFormat} from "../utils";
import LoadingButton from "@mui/lab/LoadingButton";
import AlertToast from "./alertToast";
import Navbar from "./navbar"
import Cookies from 'js-cookie';

export default class ResetPasswordPage extends React.Component {
    render() {
        let c = Cookies.get("accountID");
        return (
            <div>
                <Navbar isLogin={c!=null}/>
                <Container maxWidth="sm">
                    <ResetPasswordForm/>
                </Container>
            </div>
        );
    }
}


class ResetPasswordForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            verCode: "",
            sessionID: "",
            newPassword: "",
            verPassword: "",

            emailError: false,
            newPasswordError: false,
            verPasswordError: false,

            buttonLoading: false,

            showAlert: false,
            alertMessage: "",
            severity: "error",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.showAlert = this.showAlert.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        // Update this.state when user-input text changes
        let val = event.target.value;
        let name = event.target.name;

        this.setState({[name]: val});
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({emailError: false, newPasswordError: false, verPasswordError: false});

        let url = config.baseUrl + config.api.account.resetPassword;
        let data = {
            email: this.state.email,
            code: this.state.verCode,
            unique: this.state.sessionID,
            new_password: this.state.newPassword,
        };

        // Check email
        if (!this.checkEmail(data.email)) {
            this.showAlert("Invalid email format.");
            return;
        }

        // Check password length
        let testFail = data.new_password.length < 8;
        this.setState({newPasswordError: testFail});
        if (testFail) {
            this.showAlert("Password should be at least 8 characters long.");
            return;
        }

        // Check password verification
        testFail = data.new_password !== this.state.verPassword;
        this.setState({newPasswordError: testFail, verPasswordError: testFail});
        if (testFail) {
            this.showAlert("Passwords mismatch.");
            return;
        }

        // Start loading animation
        this.setState({buttonLoading: true});

        $.post(url, data, "json")
            .always(() => this.setState({buttonLoading: false}))
            .fail(() => {
                this.showAlert("Failed to connect to the server.");
            })
            .done((data) => {
                console.log(data);
                if (data.status === 'failed') {
                    this.showAlert("Reset password failed!", false);
                } else {
                    this.showAlert("Reset password success!", true);
                    setTimeout(() => {
                        window.location.href = "/login"
                    }, 2000);
                }
            });
    }

    showAlert(msg, success = false) {
        this.setState({
            showAlert: true,
            alertMessage: msg,
            severity: success ? "success" : "error",
        });
    }

    checkEmail(email) {
        let res = checkEmailFormat(email);
        this.setState({emailError: !res});
        return res;
    }

    render() {
        return (
            <Box component="form"
                 onSubmit={this.handleSubmit}
                 sx={{
                     height: "90vh",
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     justifyContent: "center",
                 }}>

                <Typography variant="h3" sx={{mt: 10, mb: 2}}>
                    Reset Password
                </Typography>

                <TextField
                    margin="normal"
                    error={this.state.emailError}
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    onChange={this.handleChange}
                />

                <VerificationCodeInput
                    onChange={this.handleChange}
                    email={this.state.email}
                    checkEmailCallback={this.checkEmail}
                    onUniqueChange={(d) => this.setState({sessionID: d})}
                    showAlert={this.showAlert}/>

                <TextField
                    margin="normal"
                    error={this.state.newPasswordError}
                    required
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    type="password"
                    onChange={this.handleChange}
                />

                <TextField
                    margin="normal"
                    error={this.state.verPasswordError}
                    required
                    fullWidth
                    name="verPassword"
                    label="Verify Password"
                    type="password"
                    onChange={this.handleChange}
                />

                <Box sx={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <LoadingButton
                        margin="normal"
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{mt: 2, mb: 2}}
                        loading={this.state.buttonLoading}
                    >
                        <Typography variant="h6">Submit</Typography>
                    </LoadingButton>
                </Box>

                <AlertToast alertMessage={this.state.alertMessage}
                            showAlert={this.state.showAlert}
                            severity={this.state.severity}
                            onClose={() => this.setState({showAlert: false})}/>
            </Box>
        );
    }
}
