import React from 'react'
import {Link} from "react-router-dom";
import "./navbar.css";
import PropTypes from "prop-types";
import Typography from '@mui/material/Typography';
import SearchBar from "./searchBar"
import LetterAvatars from './letterAvatar';
import {Box, Grid} from "@mui/material";
import Cookies from "js-cookie";
import * as config from "../config";
import $ from "jquery";
import AlertToast from "./alertToast";


class Navbar extends React.Component {
    static propTypes = {
        showSearchBar: PropTypes.bool,
        query: PropTypes.string,
    }

    static defaultProps = {
        showSearchBar: true,
    }

    constructor(props) {
        super(props);

        let user_token = Cookies.get("accountID");
        this.state = {
            login: user_token != null,

            alertOpen: false,
            alertMsg: "",
            alertSuccess: false,
        }
    }

    componentDidMount() {
        let user_token = Cookies.get("accountID");
        if (user_token) {
            let url = config.baseUrl + config.api.account.getEmail;
            let data = {token: user_token}

            $.post(url, data, "json")
                .fail((err) => {
                    this.showAlert("Failed to connect to the server.", false);
                    console.error(err);
                })
                .done((data) => {
                    if (data.status === "success") {
                        this.setState({login: true})
                    } else {
                        this.showAlert("Token expired, please login again", false);
                        console.error(data);
                        Cookies.remove("accountID");
                    }
                });
        } else {
            this.setState({login: false});
        }
    }

    smartPageRefresh(targetUrl) {
        if (window.location.href.includes(targetUrl)) {
            setTimeout(() => window.location.reload(), 200);
        }
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
            <nav className="navbar">
                {/*<div className="navbar-container">*/}
                <Grid container columns={50} alignItems="center" height={1}>
                    <Grid item xs={1}/>
                    <Grid item xs={13}>
                        <Link to="/" className="navbar-logo">
                            <Typography variant="h4" className='BL-logo'>
                                BruinLink
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={1}/>
                    <Grid item xs={17}>
                        {this.props.showSearchBar ? <SearchBar initialQuery={this.props.query}/> : <></>}
                    </Grid>
                    <Grid item xs={18} height={1}>
                        {
                            this.state.login ?
                                (
                                    <Box height={1}
                                         sx={{
                                             display: "flex",
                                             flexDirection: "row-reverse",
                                             alignItems: "center",
                                         }}>
                                        <Box sx={{ml: 2, mr: 4}} height={1}>
                                            <Link to="/profile" className="navbar-links">
                                                <LetterAvatars/>
                                            </Link>
                                        </Box>
                                        <Box sx={{mx: 2}} height={1}>
                                            <Link to="/search"
                                                  className="navbar-links"
                                                  onClick={() => this.smartPageRefresh("/search")}
                                            >
                                                Course
                                            </Link>
                                        </Box>
                                    </Box>
                                ) :
                                (<Box height={1}
                                      sx={{
                                          display: "flex",
                                          flexDirection: "row-reverse",
                                          alignItems: "center",
                                      }}>
                                    <Box sx={{ml: 2, mr: 4}} height={1}>
                                        <Link to="/register" className="navbar-links">
                                            Sign Up
                                        </Link>
                                    </Box>
                                    <Box sx={{mx: 2}} height={1}>
                                        <Link to="/login" className="navbar-links">
                                            Log In
                                        </Link>
                                    </Box>
                                    <Box sx={{mx: 2}} height={1}>
                                        <Link to="/search"
                                              className="navbar-links"
                                              onClick={() => this.smartPageRefresh("/search")}
                                        >
                                            Course
                                        </Link>
                                    </Box>
                                </Box>)
                        }
                    </Grid>
                </Grid>
                <AlertToast alertMessage={this.state.alertMsg}
                            showAlert={this.state.alertOpen}
                            onClose={() => this.setState({alertOpen: false})}
                            severity={this.state.alertSuccess ? "success" : "error"}/>
                {/*</div>*/}
            </nav>
        )
    }
}

export default Navbar
