import $ from "jquery"
import React from "react";
import PropTypes from "prop-types";
import {Box, Button, Container, Modal, TextField, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";
import VerificationCodeInput from "./verificationCodeInput";
import * as config from "../config"
import {checkEmailFormat} from "../utils";
import LoadingButton from "@mui/lab/LoadingButton";
import AlertToast from "./alertToast";

export default class ResetPasswordOverlay extends React.Component {
    static propTypes = {
        // Controls if the popup is open or not.
        open: PropTypes.bool.isRequired,
        // Callback function when popup is closed.
        onClose: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            verCode: "",
            sessionID: "",
            newPassword: "",
            verPassword: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
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

        // TODO
    }


    render() {
        return (
            <Modal open={this.props.open} onClose={this.props.onClose}>
                <Container fixed>
                    <Box borderRadius={2}
                         sx={{
                             position: 'absolute',
                             top: '50%',
                             left: '50%',
                             transform: 'translate(-50%, -50%)',
                             width: "550px",
                             // height: "60%",
                             bgcolor: 'background.paper',
                             border: '1px solid #000',
                             boxShadow: 24,
                             p: 4,

                             display: "flex",
                             flexDirection: "column",
                             alignItems: "center",
                         }}>

                        {/* The close button */}
                        <Button onClick={this.props.onClose}
                                size="small"
                                sx={{
                                    position: "absolute",
                                    top: "3px",
                                    right: "1px",
                                }}>
                            <Close/>
                        </Button>

                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "80%",
                        }}>

                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                width: "100%",
                                mt: 3,
                            }}>
                                <Typography variant="h5" sx={{mb: 2}}>
                                    Reset Password
                                </Typography>
                            </Box>

                            <ResetPasswordForm email={this.state.email}
                                               verCode={this.state.verCode}
                                               newPassword={this.state.newPassword}
                                               verPassword={this.state.verPassword}
                                               onChange={this.handleChange}
                                               onFinish={this.props.onClose}/>
                        </Box>
                    </Box>
                </Container>
            </Modal>
        );
    }
}


class ResetPasswordForm extends React.Component {
    static propTypes = {
        email: PropTypes.string.isRequired,
        verCode: PropTypes.string.isRequired,
        newPassword: PropTypes.string.isRequired,
        verPassword: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        onFinish: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            sessionID: "",

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
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({emailError: false, newPasswordError: false, verPasswordError: false});

        let url = config.baseUrl + config.api.account.resetPassword;
        let data = {
            email: this.props.email,
            verCode: this.props.verCode,
            sessionID: this.state.sessionID,
            password: this.props.newPassword
        };

        // Check email
        if (!this.checkEmail(data.email)) {
            this.showAlert("Invalid email format.");
            return;
        }

        // Check password length
        let testFail = data.password.length < 8;
        this.setState({newPasswordError: testFail});
        if (testFail) {
            this.showAlert("Password should be at least 8 characters long.");
            return;
        }

        // Check password verification
        testFail = data.password !== this.props.verPassword;
        this.setState({newPasswordError: testFail, verPasswordError: testFail});
        if (testFail) {
            this.showAlert("Passwords mismatch.");
            return;
        }

        // Start loading animation
        this.setState({buttonLoading: true});

        // TODO: wait for backend API implementation
        $.post(url, data, function (data, status, jqXHR) {
            console.log(data);
            console.log(status);
            console.log(jqXHR);
        }, "json")
            .always(() => this.setState({buttonLoading: false}))
            .fail(() => {
                this.showAlert("Failed to connect to the server.");
            })
            .done(() => {
                this.showAlert("Reset password success!", true)
                setTimeout(this.props.onFinish, 2000);
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
                 sx={{width: "100%"}}>
                <TextField
                    margin="normal"
                    error={this.state.emailError}
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    onChange={this.props.onChange}
                />

                <VerificationCodeInput
                    onChange={this.props.onChange}
                    email={this.props.email}
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
                    onChange={this.props.onChange}
                />

                <TextField
                    margin="normal"
                    error={this.state.verPasswordError}
                    required
                    fullWidth
                    name="verPassword"
                    label="Verify Password"
                    type="password"
                    onChange={this.props.onChange}
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
