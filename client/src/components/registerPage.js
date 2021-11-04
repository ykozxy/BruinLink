import $ from "jquery";
import React from "react";
import {Box, Button, Container, Divider, TextField, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {Link} from "react-router-dom";
import * as config from "../config"
import AlertToast from "./alertToast";
import PropTypes from "prop-types";


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
        // Regex for checking email address.
        // Cited from: https://stackoverflow.com/questions/39356826/how-to-check-if-it-a-text-input-has-a-valid-email-format-in-reactjs/39425165
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let res = re.test(email);

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

                <VerificationCode handleChange={this.handleChange} email={this.state.email}
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


class VerificationCode extends React.Component {
    static propTypes = {
        handleChange: PropTypes.func.isRequired,
        email: PropTypes.string.isRequired,
        checkEmailCallback: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            coolDown: -1,
            disableButton: false,
            showAlert: false,
            alertMessage: "",
        };

        this.handleChange = props.handleChange;
        this.handleSendCode = this.handleSendCode.bind(this);
        this.countDown = this.countDown.bind(this);
        this.timer = null;
    }

    handleSendCode() {
        if (!this.props.checkEmailCallback(this.props.email.toString())) {
            this.setState({
                showAlert: true,
                alertMessage: "Invalid email format.",
            });
            return;
        }

        let url = config.baseUrl + config.api.account.emailVerify;

        // TODO: wait for backend API implementation
        $.post(url, {email: this.props.email}, function (data, status, jqXHR) {
            console.log(data);
            console.log(status);
            console.log(jqXHR)
        }, "json")
            .done(() => {
                // If request succeed, start the cool down timer.
                this.setState({
                    coolDown: config.resendCodeCoolDown,
                    disableButton: true,
                });

                // Repetitively call countDown every second
                this.timer = setInterval(this.countDown, 1000);
            })
            .fail(() => {
                    // If request failed, show an error toast.
                    this.setState({
                        showAlert: true,
                        alertMessage: "Failed to connect to the server.",
                    });
                }
            );
    }

    countDown() {
        // Reduce coolDown by 1 second
        let remainTime = this.state.coolDown - 1;
        this.setState({coolDown: remainTime});

        if (remainTime <= 0) {
            // Cool down finished!
            clearInterval(this.timer);
            this.setState({
                disableButton: false,
            });
        }
    }

    render() {
        return (
            <Box
                width={1}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
            >

                <TextField
                    margin="normal"
                    required
                    name="verCode"
                    label="Verification Code"
                    onChange={this.handleChange}
                    sx={{width: "50%"}}
                />

                <Box width="50%" height={1} sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}>
                    <Button
                        margin="normal"
                        variant="outlined"
                        size="large"
                        disabled={this.state.disableButton}
                        sx={{mt: 1}}
                        onClick={this.handleSendCode}
                    >
                        {this.state.coolDown <= 0 ? "Send code" : this.state.coolDown}
                    </Button>
                </Box>

                <AlertToast alertMessage={this.state.alertMessage}
                            showAlert={this.state.showAlert}
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
