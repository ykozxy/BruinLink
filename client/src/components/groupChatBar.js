import React from "react";
import PropTypes from "prop-types";
import {Box, Button, Grid, Popover, Stack, SvgIcon, Typography} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AlertToast from "./alertToast";


class LinkDisplay extends React.Component {
    static propTypes = {
        /* The link of groupchat */
        link: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {openAlert: false}
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
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <Stack direction="row" spacing={1}>
                        <CheckCircleIcon color="success"/>
                    </Stack>
                </Grid>

                <Grid item>
                    <Button variant="contained" sx={{textTransform: "none"}} onClick={() => this.handleOpenLink()}>
                        <Typography variant="body1">
                            Open Link
                        </Typography>
                    </Button>
                </Grid>

                <Grid item>
                    <Button variant="contained" onClick={() => this.handleCopy()} sx={{textTransform: "none"}}>
                        <Typography variant="body1">
                            Copy
                        </Typography>
                    </Button>
                    <AlertToast alertMessage="Link copied to clipboard."
                                showAlert={this.state.openAlert}
                                onClose={() => this.setState({openAlert: false})}
                                severity="success"/>
                </Grid>
            </Grid>
        )
            ;
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
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <Stack direction="row" spacing={1}>
                        <CheckCircleIcon color="success"/>
                    </Stack>
                </Grid>

                <Grid item>
                    <Button variant="contained"
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
                        <img src={this.props.link} alt="Wechat code"/>
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
    }

    render() {
        return (
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <Stack direction="row" spacing={1}>
                        <CancelIcon color="error"/>
                    </Stack>
                </Grid>

                {/* TODO: add upload & subscribe buttons */}
            </Grid>
        );
    }
}

export default class GroupChatBar extends React.Component {
    static propTypes = {
        /* Name of the group chat */
        name: PropTypes.string.isRequired,

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
            <Grid container columnSpacing={1} columns={20} sx={{ml: 1, mb: 2}} alignItems="center">
                <Grid item xs={5}>
                    <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Box sx={{mr: 1, mt: 1}}>
                            {icon}
                        </Box>
                        <Typography>
                            <Box fontWeight={400}>{this.props.name}</Box>
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    {/* TODO: add division line */}
                </Grid>
                <Grid item xs={13}>
                    {
                        // Display components based on link type and availability
                        this.props.link ?
                            (this.props.isQrCode ?
                                    <CodeDisplay link={this.props.link}/> :
                                    <LinkDisplay link={this.props.link}/>
                            ) :
                            <NoLinkDisplay type={this.props.isQrCode ? "code" : "link"}/>
                    }
                </Grid>
            </Grid>
        )
    }
}
