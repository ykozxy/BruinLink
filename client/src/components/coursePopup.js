import React from "react";
import PropTypes from "prop-types";
import {Box, Button, Modal, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";
import {mdiDiscord, mdiWechat} from "@mdi/js"
import GroupChatBar from "./groupChatBar";
import {default as Groupme} from "../icons/groupme.svg";


export default class CoursePopup extends React.Component {
    static propTypes = {
        open: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        courseName: PropTypes.string.isRequired,
        professorName: PropTypes.string.isRequired,
        courseID: PropTypes.string.isRequired,
        wechatCode: PropTypes.string,
        discordLink: PropTypes.string,
        groupmeLink: PropTypes.string,
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
                         width: "550px",
                         // height: "60%",
                         bgcolor: 'background.paper',
                         border: '1px solid #000',
                         boxShadow: 24,
                         p: 4,

                         display: "flex",
                         flexDirection: "column",
                         alignItems: "flex-start",
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

                    <Box sx={{ml: 1, mr: 2, width: "100%"}}>
                        {/* Course title */}
                        <Typography variant="h5" sx={{mt: 1, mb: 2}}>
                            <Box fontWeight={800} display="inline" sx={{mr: 1}}>
                                {this.props.courseName}
                            </Box>
                            --
                            <Box display="inline" sx={{ml: 1}}>
                                {this.props.professorName}
                            </Box>
                        </Typography>

                        {/* Links & Codes */}
                        <GroupChatBar name="Discord"
                                      id={this.props.courseID}
                                      link={this.props.discordLink}
                                      iconSvgPath={mdiDiscord}
                                      iconColor="#5969ea"/>
                        <GroupChatBar name="Groupme"
                                      id={this.props.courseID}
                                      link={this.props.groupmeLink}
                                      iconImg={Groupme}/>
                        <GroupChatBar name="WeChat"
                                      id={this.props.courseID}
                                      link={this.props.wechatCode} isQrCode
                                      iconSvgPath={mdiWechat}
                                      iconColor="#5ecc72"/>
                    </Box>
                </Box>
            </Modal>
        );
    }
}