import React from "react";
import PropTypes from "prop-types";
import * as config from "../config";
import $ from "jquery";
import {Box, Button, TextField} from "@mui/material";
import AlertToast from "./alertToast";

export default class VerificationCodeInput extends React.Component {
    static propTypes = {
        email: PropTypes.string.isRequired,
        checkEmailCallback: PropTypes.func.isRequired,
        showAlert: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        onUniqueChange: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            coolDown: -1,
            disableButton: false,
            showAlert: false,
            alertMessage: "",
        };

        this.handleSendCode = this.handleSendCode.bind(this);
        this.countDown = this.countDown.bind(this);
        this.setState = this.setState.bind(this);
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

        $.post(url, {email: this.props.email}, "json")
            .done((data) => {
                console.log(data);
                if (data.status === "failed") {
                    this.props.showAlert("Server error! Cannot send code.");
                    return;
                }

                // If request succeed, start the cool down timer.
                this.props.showAlert("Verification code sent.", true);
                this.setState({
                    coolDown: config.resendCodeCoolDown,
                    disableButton: true,
                });

                // Repetitively call countDown every second
                this.timer = setInterval(this.countDown, 1000);

                this.props.onUniqueChange(data.unique);
            })
            .fail(() => {
                    // If request failed, show an error toast.
                    this.setState({
                        showAlert: true,
                        alertMessage: "Failed to connect to the server.",
                    });
                }
            )
        ;
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
                    autoComplete="one-time-code"
                    onChange={this.props.onChange}
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