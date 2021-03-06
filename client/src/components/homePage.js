import React from 'react'
import "./homePage.css";
import Navbar from "./navbar";
import Cookies from 'js-cookie';
import SearchBar from "./searchBar";
import {Box, Typography,Paper} from "@mui/material";
import BruinLinkLogo from "../images/BLlogo2.png"

class HomePage extends React.Component {
    render() {
        let c = Cookies.get("accountID");
        return (
            <div>
                <Navbar isLogin={c != null} showSearchBar={false}/>
                <Box sx={{
                    height: "70vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <Box width={0.7}
                         sx={{
                             display: "flex",
                             flexDirection: "column",
                             alignItems: "center"
                         }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                            <Typography variant="h3" sx={{mt: 5}} color="#556cd6">
                                Welcome to <img src={BruinLinkLogo} style={{position:"relative",top:12}}/>
                            </Typography>
                            <Typography variant="body1" sx={{mb: 5}}>
                                 A platform to find group chats for every class you have.
                            </Typography>
                        </Box>
                        <Box sx={{width: "500px"}}>
                            {/* <Typography variant="body2" sx={{ml: 0.3, mb: -0.3}}>
                                Search your class :)
                            </Typography> */}
                            {/*<SearchBar size="large" bgColor="#DCDCDC"/>*/}
                            <SearchBar size="large" bgColor="#fff"/>
                        </Box>
                    </Box>
                </Box>
            </div>
        );
    }
}

export default HomePage

