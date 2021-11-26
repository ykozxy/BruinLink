import React from 'react'
import {Link} from "react-router-dom";
import "./navbar.css";
import PropTypes from "prop-types";
import Typography from '@mui/material/Typography';
import SearchBar from "./searchBar"
import LetterAvatars from './letterAvatar';


class Navbar extends React.Component {
    constructor(props) {
        super(props);        
    }

    static propTypes = {
        isLogin: PropTypes.bool.isRequired,
    }
    
    render(){
        return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        <Typography variant="h3"  className='BL-logo'>
                         BruinLink</Typography>
                    </Link>

                    <SearchBar/>
                    <div>
                    {
                            this.props.isLogin ?
                                (
                                    <ul className="navbar-menu">
                                        <li className="navbar-item">
                                            <Link to="/search" className="navbar-links">
                                                Course
                                            </Link>
                                        </li>
                            
                                        <li className="navbar-item">
                                            <Link to="/profile" className="navbar-links">
                                                <LetterAvatars/>
                                            </Link>
                                        </li>
                                    </ul>             
                                ) :
                                <ul className="navbar-menu">
                                    <li className="navbar-item">
                                        <Link to="/search" className="navbar-links">
                                            Course
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
                        }
                        </div>
                </div>
            
            </nav>
        </>
    )
    }
}

export default Navbar
