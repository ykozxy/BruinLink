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
        this.state = {login: user_token != null}
    }

    componentDidMount() {
        let user_token = Cookies.get("accountID");
        if (user_token) {
            let url = config.baseUrl + config.api.account.getEmail;
            let data = {token: user_token}

            $.post(url, data, "json")
                .fail(() => {
                    console.log("Failed to connect to the server.");
                })
                .done((data) => {
                    if (data.status === "success") {
                        this.setState({login: true})
                    } else {
                        console.log("Token expired!");
                        console.log(data);
                        Cookies.remove("accountID");
                    }
                });
        } else {
            this.setState({login: false});
        }
    }

    render() {
        return (
            <nav className="navbar">
                {/*<div className="navbar-container">*/}
                <Grid container columns={50} alignItems="center">
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
                    <Grid item xs={18}>
                        {
                            this.state.login ?
                                (
                                    <Grid container columns={10} alignItems="center">
                                        <Grid item xs={3}/>
                                        <Grid item xs={3}>
                                            <Link to="/search" className="navbar-links">
                                                Course
                                            </Link>
                                        </Grid>
                                        <Grid item xs={1}/>
                                        <Grid item xs={3}>
                                            <Link to="/profile" className="navbar-links">
                                                <LetterAvatars/>
                                            </Link>
                                        </Grid>
                                    </Grid>
                                ) :
                                (<Box sx={{
                                    display: "flex",
                                    flexDirection: "row-reverse",
                                    alignItems: "center",
                                }}>
                                    <Box sx={{mx: 2}}>
                                        <Link to="/search" className="navbar-links">
                                            Course
                                        </Link>
                                    </Box>
                                    <Box sx={{mx: 2}}>
                                        <Link to="/login" className="navbar-links">
                                            Log In
                                        </Link>
                                    </Box>
                                    <Box sx={{mx: 2}}>
                                        <Link to="/register" className="navbar-links">
                                            Sign Up
                                        </Link>
                                    </Box>
                                </Box>)
                        }
                    </Grid>
                </Grid>
                {/*</div>*/}
            </nav>
        )
    }
}

export default Navbar
