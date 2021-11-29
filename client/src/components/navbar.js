import React from 'react'
import {Link} from "react-router-dom";
import "./navbar.css";
import PropTypes from "prop-types";
import Typography from '@mui/material/Typography';
import SearchBar from "./searchBar"
import LetterAvatars from './letterAvatar';
import {Box, Grid} from "@mui/material";


class Navbar extends React.Component {
    static propTypes = {
        isLogin: PropTypes.bool.isRequired,
    }

    constructor(props) {
        super(props);
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
                        <SearchBar/>
                    </Grid>
                    <Grid item xs={18}>
                        {
                            this.props.isLogin ?
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
