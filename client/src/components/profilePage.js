import React from 'react'
import Navbar from "./navbar";
import Cookies from 'js-cookie';
import {Button,Box, Typography} from "@mui/material";

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

class ProfilePage extends React.Component{

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        Cookies.remove("accountID");
        window.location.href = '/';
      }

    render(){
        {
            let c = Cookies.get("accountID");
            //let c = "123";
                  if (!c) {
                    return (
                        <div>
                            <Navbar isLogin={false} />
                            <h1 className='profilePage'>Please Log in to view your profile</h1>
                        </div>
                    )
                  }
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
                        

                        <MenuItem>
                        <ListItemIcon>
                            <DraftsIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit" noWrap>
                            A very long text that overflows
                        </Typography>
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