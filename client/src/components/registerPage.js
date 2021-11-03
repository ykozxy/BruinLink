import React from "react";
import {Alert, Box, Button, Container, Divider, Snackbar, TextField, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {Link} from "react-router-dom";


class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            verPassword: "",
            sessionID: "",
            verCode: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {

    }

    handleChange(event) {

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

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="verPassword"
                    label="Confirm Password"
                    type="password"
                    onChange={this.handleChange}
                />

                <VerificationCode handleChange={this.handleChange}/>

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
                            // loading={this.state.loading}
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
            </Box>
        );
    }
}


class VerificationCode extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = props.handleChange;
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
                        sx={{mt: 1}}
                    >
                        Send code
                    </Button>
                </Box>
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
