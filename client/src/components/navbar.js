import React from 'react'
import {Link} from "react-router-dom";
import "./navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        <Typography variant="h3" sx={{mt: 1, mb: 1}}
                        > BruinLink</Typography>
                    </Link>

                    <ul className="navbar-menu">
                        <li className="navbar-item">
                            <Link to="/search" className="navbar-links">
                                Search <SearchIcon/>
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/login" className="navbar-links">
                                Log In
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/register" className="navbar-links">
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                </div>
            
            </nav>
        </>
    )
}

export default Navbar
