import React from "react";
import PropTypes from "prop-types";
import {Box, Button, Modal, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";


export default class CoursePopup extends React.Component {
    static propTypes = {
        open: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        courseName: PropTypes.string.isRequired,
        courseSection: PropTypes.string.isRequired,
        wechatCode: PropTypes.string.isRequired,
        discordLink: PropTypes.string.isRequired,
        groupmeLink: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Modal open={this.props.open} onClose={this.props.onClose}>
                <Box borderRadius={2}
                     sx={{
                         position: 'absolute',
                         top: '50%',
                         left: '50%',
                         transform: 'translate(-50%, -50%)',
                         width: "auto",
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

                    <Typography variant="h5" sx={{ml: 5, mr: 5, mt: 1}}>
                        <Box fontWeight={800} display="inline" sx={{mr: 1}}>
                            {this.props.courseName}
                        </Box>
                        --
                        <Box display="inline" sx={{ml: 1}}>
                            {this.props.courseSection}
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        );
    }
}