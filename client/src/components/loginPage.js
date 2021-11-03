import $ from "jquery"
import React from "react";
import {Box, Button, Container, Modal, TextField, Typography} from "@mui/material";
import * as config from "../config"
import {Link} from "react-router-dom";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
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

        let url = config.baseUrl + config.api.account.login;
        let data = {email: this.state.email, password: this.state.password}

        // TODO: add .then() to catch errors
        $.post(url, data, function (res) {
            console.log(res);
        }, "json");

        console.log("Login requested with data: ")
        console.log(data);
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
                <Typography variant="h2" sx={{mt: 10}}>
                    Login
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    onChange={this.handleChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    onChange={this.handleChange}
                />
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <Button
                        margin="normal"
                        type="submit"
                        variant="contained"
                        sx={{mt: 2, mb: 2, mr: 2}}
                    >
                        <Typography variant="h6">Login</Typography>
                    </Button>
                    <Typography variant="h6">
                        or&nbsp;
                        <Link to="./register">
                            register
                        </Link>
                        &nbsp;now
                    </Typography>
                </Box>
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
