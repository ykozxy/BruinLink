import $ from "jquery";
import React from "react";
import PropTypes from "prop-types";
import {Box, Button, Modal, Typography} from "@mui/material";
import {Close} from "@mui/icons-material";
import {mdiDiscord, mdiWechat} from "@mdi/js"
import GroupChatBar from "./groupChatBar";
import {default as Groupme} from "../images/groupme.svg";
import * as config from "../config"
import Cookies from "js-cookie";
import AlertToast from "./alertToast";


export default class CoursePopup extends React.Component {
    static propTypes = {
        open: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        courseName: PropTypes.string.isRequired,
        professorName: PropTypes.string.isRequired,
        courseID: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            fetchFinished: false,
            discordLink: null,
            groupmeLink: null,
            wechatCodeBuffer: null,
            wechatCodeType: null,
            subscribed: false,

            alertOpen: false,
            alertMsg: "",
            alertSuccess: false,
        };

        this.refresh = this.refresh.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Do not fetch image / links unless we are opening this popup
        if (this.props.open && !prevProps.open)
            this.refresh();
    }

    refresh(showAnimation = true) {
        if (showAnimation)
            this.setState({fetchFinished: false});

        /* Fetch group chat links */
        let url = config.baseUrl + config.api.course.getDetail;
        let data = {courseid: this.props.courseID};

        $.post(url, data, "json")
            .done((data) => {
                if (data.status === "success") {
                    this.setState({
                        discordLink: data.detail.discordLink,
                        groupmeLink: data.detail.groupmeLink,
                        wechatCodeBuffer: data.detail.wechatQRCode,
                        wechatCodeType: data.detail.content_type,
                    })
                }
            })
            .fail((err) => {
                this.showAlert("Failed to connect to the server.", false);
                console.error(err);
            })
            .always(() => {
                /* Fetch course list and check subscription */
                let c = Cookies.get("accountID");
                if (!c) {
                    this.showAlert("You've not login yet.", false);
                    if (showAnimation)
                        this.setState({fetchFinished: true});
                    return;
                }

                url = config.baseUrl + config.api.subscription.getSubscriptions;
                data = {token: c};

                $.post(url, data, "json")
                    .done((data) => {
                        if (data.status === "success") {
                            let flag = false;
                            data.courselist.forEach(element => {
                                if (element.courseid === this.props.courseID) {
                                    // We already subscribed
                                    flag = true;
                                }
                            });
                            this.setState({subscribed: flag});
                            // console.log(`Subscription: ` + flag);
                        } else {
                            this.showAlert("Failed to fetch subscription list.", false);
                            console.error(data);
                        }
                    })
                    .fail((err) => {
                        this.showAlert("Failed to connect to the server.", false);
                        console.error(err);
                    })
                    .always(() => {
                        if (showAnimation)
                            this.setState({fetchFinished: true});
                    })
            });
    }

    showAlert(msg, success) {
        this.setState({
            alertOpen: true,
            alertMsg: msg,
            alertSuccess: success,
        })
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
                                      link={this.state.discordLink}
                                      iconSvgPath={mdiDiscord}
                                      iconColor="#5969ea"
                                      loading={!this.state.fetchFinished}
                                      onRefresh={this.refresh}
                                      subscribed={this.state.subscribed}/>
                        <GroupChatBar name="Groupme"
                                      id={this.props.courseID}
                                      link={this.state.groupmeLink}
                                      iconImg={Groupme}
                                      loading={!this.state.fetchFinished}
                                      onRefresh={this.refresh}
                                      subscribed={this.state.subscribed}/>
                        <GroupChatBar name="WeChat"
                                      id={this.props.courseID}
                                      isQrCode
                                      imageType={this.state.wechatCodeType}
                                      imageBuffer={this.state.wechatCodeBuffer}
                                      iconSvgPath={mdiWechat}
                                      iconColor="#5ecc72"
                                      loading={!this.state.fetchFinished}
                                      onRefresh={this.refresh}
                                      subscribed={this.state.subscribed}/>
                    </Box>
                    <AlertToast alertMessage={this.state.alertMsg}
                                showAlert={this.state.alertOpen}
                                onClose={() => this.setState({alertOpen: false})}
                                severity={this.state.alertSuccess ? "success" : "error"}/>
                </Box>
            </Modal>
        );
    }
}