import React from "react";
import {Alert, Box, Popover} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from "prop-types";


export default class IconTooltip extends React.Component {
    static propTypes = {
        msg: PropTypes.string.isRequired,
        success: PropTypes.bool,
        icon: PropTypes.any,
        showTooltipIcon: PropTypes.bool,
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
                    {this.props.icon ? (
                        this.props.icon
                    ) : (
                        this.props.success ? <CheckCircleIcon color="success"/>
                            : <CancelIcon color="error"/>
                    )
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
                        {
                            this.props.showTooltipIcon ?
                                <Alert severity={this.props.success ? "success" : "error"}
                                       sx={{pl: 1.5, pr: 1.5, pu: 0.5, pb: 0.5}}>
                                    {this.props.msg}
                                </Alert> :
                                <Alert icon={false}
                                       severity={this.props.success ? "success" : "error"}
                                       sx={{pl: 1.5, pr: 1.5, pu: 0.5, pb: 0.5}}>
                                    {this.props.msg}
                                </Alert>
                        }
                    </Box>
                </Popover>
            </Box>
        )
    }
}
