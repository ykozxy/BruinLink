import $ from "jquery"
import React from "react";
import PropTypes from "prop-types";
import {Alert, Box, Button, Grid, Popover, Stack, SvgIcon, TextField, Typography} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import LaunchIcon from '@mui/icons-material/Launch';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import QrCodeIcon from '@mui/icons-material/QrCode';
import EmailIcon from '@mui/icons-material/Email';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import {LoadingButton} from "@mui/lab";
import AlertToast from "./alertToast";
import * as config from "../config"

class IconTooltip extends React.Component {
    static propTypes = {
        msg: PropTypes.string.isRequired,
        success: PropTypes.bool,
    }

    constructor(props) {
        super(props);
        this.state = {open: false, anchorEL: null};
    }

    handleShowTooltip(event) {
        this.setState({open: true, anchorEL: event.currentTarget});
    }

    handleHideTooltip() {
        this.setState({open: false, anchorEL: null});
    }

    render() {
        return (
            <Box sx={{display: "flex", alignItems: "center"}}>
                {this.props.success ?
                    <CheckCircleIcon color="success"
                                     onMouseEnter={(e) => this.handleShowTooltip(e)}
                                     onMouseLeave={() => this.handleHideTooltip()}/>
                    :
                    <CancelIcon color="error"
                                onMouseEnter={(e) => this.handleShowTooltip(e)}
                                onMouseLeave={() => this.handleHideTooltip()}/>
                }
                {/* TODO: fix popover */}
                <Popover open={this.state.open}
                         anchorEl={this.state.anchorEL}
                         onClose={() => this.handleHideTooltip()}>
                    <Alert severity={this.props.success ? "success" : "error"}>
                        {this.props.msg}
                    </Alert>
                </Popover>
            </Box>
        )
    }
}

class LinkDisplay extends React.Component {
    static propTypes = {
        /* The link of groupchat */
        link: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {openAlert: false};
    }

    handleCopy() {
        navigator.clipboard.writeText(this.props.link);
        this.setState({openAlert: true});
    }

    handleOpenLink() {
        window.open(this.props.link);
    }

    render() {
        /* We have a link */
        return (
            <Grid container alignItems="center" spacing={2} columns={20}>
                <Grid item xs={3}>
                    <Stack direction="row" spacing={1}>
                        <IconTooltip success msg={"Link available!"}/>
                    </Stack>
                </Grid>

                <Grid item>
                    <Button size="small"
                            variant="contained"
                            endIcon={<LaunchIcon/>}
                            onClick={() => this.handleOpenLink()}
                            sx={{textTransform: "none"}}>
                        Open Link
                    </Button>
                </Grid>

                <Grid item>
                    <Button size="small"
                            variant="contained"
                            endIcon={<CopyAllIcon/>}
                            onClick={() => this.handleCopy()}
                            sx={{textTransform: "none"}}>
                        Copy
                    </Button>
                    <AlertToast alertMessage="Link copied to clipboard."
                                showAlert={this.state.openAlert}
                                onClose={() => this.setState({openAlert: false})}
                                severity="success"/>
                </Grid>
            </Grid>
        );
    }
}

class CodeDisplay extends React.Component {
    static propTypes = {
        /* The link to the qr codek */
        link: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {openPopup: false, anchorEL: null};
    }

    handleShowCode(event) {
        this.setState({openPopup: true, anchorEL: event.currentTarget});
    }

    handleClosePopup() {
        this.setState({openPopup: false, anchorEL: null});
    }

    render() {
        return (
            <Grid container alignItems="center" spacing={2} columns={20}>
                <Grid item xs={3}>
                    <Stack direction="row" spacing={1}>
                        <IconTooltip success msg={"QR code available!"}/>
                    </Stack>
                </Grid>

                <Grid item xs={17}>
                    <Button size="small"
                            variant="contained"
                            endIcon={<QrCodeIcon/>}
                            onClick={(e) => this.handleShowCode(e)}
                            sx={{textTransform: "none"}}>
                        Show QR Code
                    </Button>
                    <Popover open={this.state.openPopup}
                             onClose={() => this.handleClosePopup()}
                             anchorEl={this.state.anchorEL}
                             anchorOrigin={{
                                 vertical: 'top',
                                 horizontal: 'center',
                             }}
                             transformOrigin={{
                                 vertical: 'bottom',
                                 horizontal: 'center',
                             }}>
                        <img src={this.props.link} alt="QR code"/>
                    </Popover>
                </Grid>
            </Grid>
        );
    }
}

class NoLinkDisplay extends React.Component {
    static propTypes = {
        /* Specify the type of the link */
        type: PropTypes.oneOf(["img", "link"]).isRequired,
        /* Unique id of the course/club */
        id: PropTypes.string.isRequired,
        /* Course/club name */
        name: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            subscribed: false,
            subscribeSuccess: false,

            showAlert: false,
            alertMessage: "",

            showPopover: false,
            popoverAnchor: null,
        }
    }


    handleContribute(e) {
        this.setState({showPopover: true, popoverAnchor: e.currentTarget});
    }

    handlePopupClose() {
        this.setState({showPopover: false, popoverAnchor: null});
    }

    handleSubscribe() {
        let url;
        if (this.state.subscribed) {
            // Then unsubscribe
            url = config.baseUrl + config.api.subscription.unsubscribe;
        } else {
            // Then subscribe
            url = config.baseUrl + config.api.subscription.subscribe;
        }
        let data = {id: this.props.id};

        this.setState({loading: true});
        $.post(url, data, function (data, status, jqXHR) {
            console.log(data);
            console.log(status);
            console.log(jqXHR)
        }, "json")
            .always(() => {
                this.setState({loading: false});
            })
            .done(() => {
                this.setState(prev => ({subscribed: !prev.subscribed}));
                let msg = this.state.subscribed ? "Subscribed to " : "Unsubscribed from ";
                this.showAlert(msg + this.props.name + "!", true);
            })
            .fail(() => {
                this.showAlert("Failed to connect to the server.", false);
            });
    }

    showAlert(msg, success) {
        this.setState({
            showAlert: true,
            alertMessage: msg,
            subscribeSuccess: success,
        });
    }

    render() {
        return (
            <Grid container alignItems="center" spacing={2} columns={20}>
                <Grid item xs={3}>
                    <Stack direction="row" spacing={1}>
                        <IconTooltip msg={"No " + (this.props.type === "img" ? "QR code" : "link") + "yet!"}/>
                    </Stack>
                </Grid>

                <Grid item>
                    <Button size="small"
                            variant="contained"
                            color="warning"
                            endIcon={<CloudUploadIcon/>}
                            onClick={(e) => this.handleContribute(e)}
                            sx={{textTransform: "none"}}>
                        Contribute
                    </Button>
                    {/* TODO: implement popover or redirect */}
                    <Popover open={this.state.showPopover}
                             anchorEl={this.state.popoverAnchor}
                             onClose={() => this.handlePopupClose()}>
                        <Box sx={{width: 120}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="link"
                                label="Link"
                                // onChange={this.handleChange}
                            />
                        </Box>
                    </Popover>
                </Grid>

                <Grid item>
                    <LoadingButton size="small"
                                   variant="contained"
                                   color="warning"
                                   endIcon={this.state.subscribed ? <MarkEmailReadIcon/> : <EmailIcon/>}
                                   loadingPosition="end"
                                   loading={this.state.loading}
                                   onClick={() => this.handleSubscribe()}
                                   sx={{textTransform: "none"}}>
                        Subscribe{this.state.subscribed ? "d" : ""}
                    </LoadingButton>
                    <AlertToast alertMessage={this.state.alertMessage}
                                showAlert={this.state.showAlert}
                                onClose={() => this.setState({showAlert: false})}
                                severity={this.state.subscribeSuccess ? "success" : "error"}/>
                </Grid>
            </Grid>
        );
    }
}

export default class GroupChatBar extends React.Component {
    static propTypes = {
        /* Name of the group chat */
        name: PropTypes.string.isRequired,

        /* Unique ID of the course/club */
        id: PropTypes.string.isRequired,

        /* The link of groupchat, null for no-link */
        link: PropTypes.string.isRequired,

        /* When set to true, will treat props.link as a link to an the QR code image  */
        isQrCode: PropTypes.bool,

        /* Icon config. Must provide a file or svg pat. */
        // SVG path of icon
        iconSvgPath: PropTypes.string,
        // File to icon
        iconImg: PropTypes.string,
        // Color of SVG icons
        iconColor: PropTypes.string,
    }


    render() {
        /* Generate the correct icon component */
        let icon;
        if (this.props.iconSvgPath) {
            icon = (
                <SvgIcon sx={{color: this.props.iconColor, width: 30, height: 30}}>
                    <path d={this.props.iconSvgPath}/>
                </SvgIcon>
            );
        } else if (this.props.iconImg) {
            icon = (
                <img src={this.props.iconImg} width={30} height={30} alt={this.props.name + " icon"}/>
            );
        } else {
            console.error("Group chat icon not specified.");
            icon = <></>
        }

        return (
            <Grid container columnSpacing={1} columns={50} sx={{ml: 1, mb: 2}} alignItems="center">
                <Grid item xs={10}>
                    <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Box sx={{mr: 1, mt: 1}}>
                            {icon}
                        </Box>
                        <Typography>
                            <Box fontWeight={500}>{this.props.name}</Box>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={5}/>
                <Grid item xs={35}>
                    {
                        // Display components based on link type and availability
                        this.props.link ?
                            (this.props.isQrCode ?
                                    <CodeDisplay link={this.props.link}/> :
                                    <LinkDisplay link={this.props.link}/>
                            ) :
                            <NoLinkDisplay type={this.props.isQrCode ? "code" : "link"} id={this.props.id}
                                           name={this.props.name}/>
                    }
                </Grid>
            </Grid>
        )
    }
}
