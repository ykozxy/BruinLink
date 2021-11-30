import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Alert, Box,  Grid, Stack, SvgIcon, Popover,Typography} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

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
                <Box sx={{display: "flex", alignItems: "center"}}
                     onMouseEnter={(e) => this.handleShowTooltip(e)}
                     onMouseLeave={() => this.handleHideTooltip()}>
                    {this.props.success ? <CheckCircleIcon color="success"/>
                        : <CancelIcon color="error"/>
                    }
                </Box>
                <Popover open={this.state.open}
                         anchorEl={this.state.anchorEL}
                         onClose={() => this.handleHideTooltip()}
                         style={{pointerEvents: 'none'}}
                         anchorOrigin={{
                             vertical: 'top',
                             horizontal: 'center',
                         }}
                         transformOrigin={{
                             vertical: 'bottom',
                             horizontal: 'center',
                         }}>
                    <Box borderRadius={1}>
                        <Alert severity={this.props.success ? "success" : "error"}
                               sx={{pl: 1.5, pr: 1.5, pu: 0.5, pb: 0.5}}>
                            {this.props.msg}
                        </Alert>
                    </Box>
                </Popover>
            </Box>
        )
    }
}



export default class ClassCardGroupChatBar extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        link: PropTypes.bool.isRequired,
        iconSvgPath: PropTypes.string,
        iconImg: PropTypes.string,
        iconColor: PropTypes.string,
    }

    render() {
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
                        {/* <Typography>
                            <Box fontWeight={500}>{this.props.name}</Box>
                        </Typography> */}
                    </Box>
                </Grid>
                <Grid item xs={5}/>
                <Grid item xs={35}>
                {
                        this.props.link ?
                            (
                                <Grid container alignItems="center" spacing={2} columns={20}>
                                <Grid item xs={3}>
                                    <Stack direction="row" spacing={1}>
                                        <IconTooltip success msg={"Group chat link available!"}/> 
                                    </Stack>
                                </Grid>
                                </Grid>
                            ) :
                            <Grid container alignItems="center" spacing={2} columns={20}>
                            <Grid item xs={3}>
                                    <Stack direction="row" spacing={1}>
                                        <IconTooltip msg={"No group chat yet!"}/>
                                    </Stack>
                                </Grid>
                                </Grid>
                            
                    }
                    
                </Grid>
            </Grid>
        )
    }

}
