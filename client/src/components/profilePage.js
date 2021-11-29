import React from 'react'
import Navbar from "./navbar";
import Cookies from 'js-cookie';
import {Link} from "react-router-dom";
import {Button,Box, Typography} from "@mui/material";
import * as config from "../config"
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

class ProfilePage extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            email:null,
            password:null
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        Cookies.remove("accountID");
        window.location.href = '/';
      }

    render(){
        {
            let user_token = Cookies.get("accountID");
            //let user_token = "123";
                  if (!user_token) {
                    return (
                        <div>
                            <Navbar isLogin={false} />
                            <h1 className='profilePage'>Please Log in to view your profile</h1>
                        </div>
                    )
                  }
            // let data={token:user_token}
            
            // //get user account information from backend
            // //let url = config.baseUrl + config.api.account.login;

            // $.get(url, data,"json")
            // .fail(() => {
            //     console.log("Failed to connect to the server.");
            // })

            // .done((data) => {
            //     console.log(data);

            // });

        }
        return (
            <div>
                <Navbar isLogin={true} />
                <Box
                    sx={{
                        height: "90vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h3" sx={{mt: 10, mb: 2}}>
                    Profile
                    </Typography>

                    <Paper sx={{ width: 300, mt:4 }}>
                    <MenuList>

                        <MenuItem>
                            <ListItemIcon>
                                <DraftsIcon fontSize="medium" />
                            </ListItemIcon>
                            <Typography variant="h5"  noWrap>
                                Email
                            </Typography>
                        </MenuItem>

                        <MenuItem>
                            <ListItemIcon>
                                <SendIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit">xxxxxxxx@qq.com</Typography>
                        </MenuItem>

                        <MenuItem/>
                        <MenuItem/>
                        

                        <MenuItem>
                            <ListItemIcon>
                                <VpnKeyIcon fontSize="medium" />
                            </ListItemIcon>
                            <Typography variant="h5"  noWrap>
                                Password
                            </Typography>
                        </MenuItem>

                        <MenuItem>
                        <ListItemIcon>
                                <SendIcon fontSize="small" />
                        </ListItemIcon>
                            <Link to='/resetPassword'>
                            Reset Password
                            </Link>
                        </MenuItem>

                    </MenuList>
                    </Paper>                    

                    <Button onClick={this.handleClick}
                            variant="contained"
                            sx={{mt: 6, mb: 2}}>
                        Log Out
                    </Button>
                </Box>
            </div>
        )
    }

}

export default ProfilePage