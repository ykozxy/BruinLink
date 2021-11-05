import React from "react";
import PropTypes from "prop-types";
import {Box, Button, Container, Modal, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";

export default class ResetPasswordOverlay extends React.Component {
    static propTypes = {
        // Controls if the popup is open or not.
        open: PropTypes.bool.isRequired,
        // Callback function when popup is closed.
        onClose: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <Box
                    borderRadius={2}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: "70%",
                        // height: "60%",
                        bgcolor: 'background.paper',
                        border: '1px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                    <Button
                        onClick={this.props.onClose}
                        size="small"
                        sx={{
                            position: "absolute",
                            top: "3px",
                            right: "1px",
                        }}>
                        <Close/>
                    </Button>

                    <Container maxWidth="small">
                        <Typography variant="h5">
                            Reset Password
                        </Typography>
                    </Container>
                </Box>
            </Modal>
        );
    }
}