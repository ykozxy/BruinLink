import React from 'react'
import Navbar from "./navbar";
import Cookies from 'js-cookie';
import {Link} from "react-router-dom";
import {Box, Button, Divider, IconButton, List, ListItem, ListItemText, Typography} from "@mui/material";
import * as config from "../config"
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import ListItemIcon from '@mui/material/ListItemIcon';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ClassIcon from '@mui/icons-material/Class';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import $ from "jquery"
import IconTooltip from "./iconTooltip";
import AlertToast from "./alertToast";

class ProfilePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: null,
            courseList: [],

            alertOpen: false,
            alertMsg: "",
            alertSuccess: false,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleUnsubscribe = this.handleUnsubscribe.bind(this);
    }

    componentDidMount() {
        let user_token = Cookies.get("accountID");
        if (!user_token) return;

        /* Get email from server */
        let url = config.baseUrl + config.api.account.getEmail;
        let data = {token: user_token}
        //console.log(data)
        $.post(url, data, "json")
            .fail((err) => {
                this.showAlert("Failed to connect to the server", false);
                console.error(err);
            })

            .done((data) => {
                this.setState({email: data.email})

            });

        /* Get subscribed courses from server */
        this.setState({loading: true});

        url = config.baseUrl + config.api.subscription.getSubscriptions;
        data = {token: user_token};
        let courses = []

        $.post(url, data, "json")
            .done((data) => {
                if (data.status === "success") {
                    data.courselist.forEach(element => {
                        courses.push({name: element.coursename, professor: element.profname, id: element.courseid});
                    });
                    this.setState({courseList: courses});
                } else {
                    this.showAlert("Failed to fetch course list.", false);
                    console.error(data);
                }
            })
            .fail((err) => {
                this.showAlert("Failed to connect to the server", false);
                console.error(err);
            })
            .always(() => this.setState({loading: false}));
    }

    handleClick() {
        Cookies.remove("accountID");
        window.location.href = '/';
    }

    handleUnsubscribe(courseID) {
        let url = config.baseUrl + config.api.subscription.unsubscribe;
        let c = Cookies.get("accountID");
        let data = {course: courseID, token: c};

        $.post(url, data, "json")
            .done((data) => {
                if (data.status === "success") {
                    location.reload();
                } else {
                    console.error(data);
                }
            })
            .fail(() => {
                this.showAlert("Failed to connect to the server.", false);
            });
    }

    showAlert(msg, success) {
        this.setState({
            alertOpen: true,
            alertMsg: msg,
            alertSuccess: success,
        })
    }

    render() {
        {
            let user_token = Cookies.get("accountID");
            //let user_token = "123";
            if (!user_token) {
                return (
                    <div>
                        <Navbar isLogin={false}/>
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
                <Navbar isLogin={true}/>
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

                    <Paper sx={{width: 400, mt: 4}}>
                        <MenuList>

                            <MenuItem>
                                <ListItemIcon>
                                    <DraftsIcon fontSize="medium"/>
                                </ListItemIcon>
                                <Typography variant="h6" noWrap>
                                    Email
                                </Typography>
                            </MenuItem>

                            <MenuItem>
                                <ListItemIcon>
                                    <SendIcon fontSize="small"/>
                                </ListItemIcon>
                                <Typography variant="inherit">{this.state.email}</Typography>
                            </MenuItem>

                            <Divider orientation="horizontal" sx={{my: 2}}/>

                            <MenuItem>
                                <ListItemIcon>
                                    <VpnKeyIcon fontSize="medium"/>
                                </ListItemIcon>
                                <Typography variant="h6" noWrap>
                                    Password
                                </Typography>
                            </MenuItem>

                            <MenuItem>
                                <ListItemIcon>
                                    <SendIcon fontSize="small"/>
                                </ListItemIcon>
                                <Link to='/resetPassword'>
                                    Reset Password
                                </Link>
                            </MenuItem>

                            <Divider orientation="horizontal" sx={{my: 2}}/>

                            <MenuItem>
                                <ListItemIcon>
                                    <ClassIcon fontSize="small"/>
                                </ListItemIcon>
                                <Typography variant="h6" noWrap>
                                    Subscribed Courses
                                </Typography>
                            </MenuItem>

                            <List>
                                {this.state.courseList.length === 0 ?
                                    <ListItem key={0} sx={{mt: -1, ml: 0.5}}>
                                        None
                                    </ListItem> :
                                    this.state.courseList.map(element =>
                                        <ListItem key={element.id}
                                                  secondaryAction={
                                                      <IconButton onClick={() => this.handleUnsubscribe(element.id)}
                                                                  edge="end"
                                                                  aria-label="unsubscribe">
                                                          <IconTooltip msg="Unsubscribe" success
                                                                       icon={<MarkEmailReadIcon/>}/>
                                                      </IconButton>
                                                  }>
                                            <ListItemText
                                                primary={element.name}
                                                secondary={element.professor}
                                            />
                                        </ListItem>
                                    )
                                }
                            </List>
                        </MenuList>
                    </Paper>

                    <Button onClick={this.handleClick}
                            variant="contained"
                            sx={{mt: 6, mb: 2}}>
                        Log Out
                    </Button>
                </Box>
                <AlertToast alertMessage={this.state.alertMsg}
                            showAlert={this.state.alertOpen}
                            onClose={() => this.setState({alertOpen: false})}
                            severity={this.state.alertSuccess ? "success" : "error"}/>
            </div>
        )
    }

}

export default ProfilePage