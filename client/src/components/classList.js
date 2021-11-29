import React from 'react'
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ClassCard from "./classCard";
import PropTypes from "prop-types";
import $ from "jquery"
import * as config from "../config"


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  class ClassList extends React.Component {
    constructor(props) {
      super(props);
  }

  static propTypes = {
    courseName: PropTypes.string,
    department: PropTypes.string,
    division: PropTypes.string
  }

  
    render(){
      let url = config.baseUrl + config.api.course.search;
      // let data = {coursename:this.props.courseName,
      //             department: this.props.department,
      //             division: this.props.division}

            let data = {coursename:"CS",
                  department: "computer science",
                  division: "lower"}
      console.log(data)
      $.get(url, data,"json")
      .fail(() => {
          console.log("Failed to connect to the server.");
      })

      .done((data) => {
          console.log(data);

      });

    return (
      <Box 
            sx={{
                // position:'absolute',
                width: '70%',
                // transform: 'translate(60%, 50%)',
                alignItems: "flex-start",

            }}
        >
        <Grid container rowSpacing={8} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={6} lg={4}
            sx={{
                '&:hover': {
                opacity: [0.9, 0.8, 0.7],
                },
            }}>
            <ClassCard
                courseName="CS 35L" 
                professorName="Paul Eggert" 
                courseID="10000000"
                discordLink="https://discord.com/"
                groupmeLink="https://groupme.com/"
                wechatCode="https://pbs.twimg.com/profile_images/1087188469397344257/HXxlDWIf_400x400.jpg"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}
          sx={{
                '&:hover': {
                opacity: [0.9, 0.8, 0.7],
                },
            }}>
            <ClassCard 
                courseName="CS 35L" 
                professorName="Paul Eggert-2" 
                courseID="10000000"
                //discordLink="https://discord.com/"
                //groupmeLink={"https://groupme.com/"}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}
          sx={{
                '&:hover': {
                opacity: [0.9, 0.8, 0.7],
                },
            }}>
            <ClassCard 
                courseName="CS M51A" 
                professorName="Korf" 
                courseID="10000000"
                //discordLink="https://discord.com/"
                groupmeLink="https://groupme.com/"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}
          sx={{
                '&:hover': {
                opacity: [0.9, 0.8, 0.7],
                },
            }}>
            <ClassCard
                courseName="CS 180" 
                professorName="C" 
                courseID="10000000"
                discordLink="https://discord.com/"
                groupmeLink="https://groupme.com/" />
          </Grid>
        </Grid>
      </Box>
    )}
  }

  export default ClassList

