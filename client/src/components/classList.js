import React from 'react'
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ClassCard from "./classCard";
import PropTypes from "prop-types";
import $ from "jquery"
import * as config from "../config"
import AlertToast from "./alertToast";
import Typography from '@mui/material/Typography';
import {Skeleton} from "@mui/material";


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  class ClassList extends React.Component {
    constructor(props) {
      super(props);

        this.state = {
            // _class:<ClassCard                  courseName="CS 180"
            // professorName="C"
            // courseID="10000000" />,
            classArray: [],
            alertOpen: false,
            alertSuccess: false,
            alertMsg: "",
            loading: true,
        }
    }

      showAlert(msg, success) {
          this.setState({
              alertOpen: true,
              alertSuccess: success,
              alertMsg: msg,
          });
      }

      componentDidMount() {
          this.setState({loading: true});
          let url = config.baseUrl + config.api.course.search;
          let data = {
              coursename: this.props.courseName,
              department: this.props.department,
              division: this.props.division
          };
          //console.log("Search Data from User:");
          //console.log(data);
          // let data = {coursename:"",
          //             department: "",
  //             division: ""}
let _classArray=[]
      $.post(url, data, "json")
          .fail((err) => {
              console.error(err);
              this.showAlert("Failed to connect to the server.", false);
          })

          .done((data) => {
            if(data.courselist){
                // console.log(data.courselist);
               _classArray=[...data.courselist]
              //console.log("CourseList:");
              //console.log(data.courselist);
            //   for (let i =0;i<data.courselist.length;i++)
            //   {
            //     var class_returned=data.courselist[i];
            //     // classArray.push(<ClassCard 
            //     //   courseName="CS 180" 
            //     // professorName="C" 
            //     // courseID="10000000"
            //     // discordLink="https://discord.com/"
            //     // groupmeLink="https://groupme.com/" 
            //     // />)
            //   }
              this.setState({
                classArray:_classArray
            })
          }
            else{
              location.href='/'

            }
          })

          .always(() => this.setState({loading: false}));
  //console.log(classArray_temp)
  //console.log(this.state.classArray)


  }

  static propTypes = {
    courseName: PropTypes.string,
    department: PropTypes.string,
    division: PropTypes.string
  }

  // createClassArray = () => {
  //   let url = config.baseUrl + config.api.course.search;
  //   let data = {coursename:this.props.courseName,
  //               department: this.props.department,
  //               division: this.props.division};
  //     //console.log("Search Data from User:");
  //     //console.log(data);
  // // let data = {coursename:"",
  // //             department: "",
  // //             division: ""}
  //   let classArray_temp=[];
  //     $.post(url, data, "json")
  //         .fail(() => {
  //             console.log("Failed to connect to the server.");
  //         })

  //         .done((data) => {
  //           if(data.courselist){
  //             //console.log("CourseList:");
  //             //console.log(data.courselist);
  //             for (let i =0;i<data.courselist.length;i++)
  //             {
  //               var class_returned=data.courselist[i];
  //               //console.log(class_returned);
  //               classArray_temp.push(<ClassCard 
  //                 courseName="CS 180" 
  //               professorName="C" 
  //               courseID="10000000"
  //               discordLink="https://discord.com/"
  //               groupmeLink="https://groupme.com/" 
  //               />)
  //               //classArray_temp.push(class_returned);
  //             }
  //           }
  //           else{
  //             location.href='/'
  //             return
  //           }
  //         });

  //         console.log(classArray_temp)
  //         return classArray_temp
  // }
  
    render(){
        if (this.state.loading) {
            // if (true) {
            return (
                <Box sx={{width: '70%'}}>
                    <Grid container rowSpacing={8} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                        {
                            [...Array(6).keys()].map(e => (
                                <Grid key={e} item xs={12} sm={12} md={6} lg={4}>
                                    <Skeleton variant="rectangular" animation="wave">
                                        <ClassCard courseName="" professorName="" courseID=""
                                                   wechatCode discordLink groupmeLink/>
                                    </Skeleton>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            )
        }

      // {console.log(this.state.classArray)}
        if(this.state.classArray.length==0){
          return <Typography variant="h5"> Your search did not match any courses.</Typography>
        }
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
              {
                this.state.classArray.map(function(_class){
                  return (
                    <Grid key={_class.courseid} item xs={12} sm={12} md={6} lg={4}
            sx={{
                '&:hover': {
                opacity: [0.9, 0.8, 0.7],
                },
            }}>
                    <ClassCard key={_class.courseid}
                               courseName={_class.coursename}
                               professorName={_class.profname}
                               courseID={_class.courseid}
                               discordLink={_class.discord}
                               groupmeLink={_class.groupme}
                               wechatCode={_class.wechat}/>
                    </Grid>)
                })
              }
        </Grid>
          <AlertToast alertMessage={this.state.alertMsg}
                      showAlert={this.state.alertOpen}
                      onClose={() => this.setState({alertOpen: false})}
                      severity={this.state.success ? "success" : "error"}/>
      </Box>
    )}
}
  //     {/* <Grid container rowSpacing={8} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
  //          <Grid item xs={12} sm={12} md={6} lg={4}
  //           sx={{
  //               '&:hover': {
  //               opacity: [0.9, 0.8, 0.7],
  //               },
  //           }}>
  //           <ClassCard
  //               courseName="CS 35L" 
  //               professorName="Paul Eggert" 
  //               courseID="10000000"
  //               discordLink="https://discord.com/"
  //               groupmeLink="https://groupme.com/"
  //               wechatCode="https://pbs.twimg.com/profile_images/1087188469397344257/HXxlDWIf_400x400.jpg"
  //           />
  //         </Grid>
  //         <Grid item xs={12} sm={12} md={6} lg={4}
  //         sx={{
  //               '&:hover': {
  //               opacity: [0.9, 0.8, 0.7],
  //               },
  //           }}>
  //           <ClassCard 
  //               courseName="CS 35L" 
  //               professorName="Paul Eggert-2" 
  //               courseID="10000000"
  //               discordLink="https://discord.com/"
  //               groupmeLink={"https://groupme.com/"}
  //           />
  //         </Grid>
  //         <Grid item xs={12} sm={12} md={6} lg={4}
  //         sx={{
  //               '&:hover': {
  //               opacity: [0.9, 0.8, 0.7],
  //               },
  //           }}>
  //           <ClassCard 
  //               courseName="CS M51A" 
  //               professorName="Korf" 
  //               courseID="10000000"
  //               discordLink="https://discord.com/"
  //               groupmeLink="https://groupme.com/"
  //           />
  //         </Grid>
  //         <Grid item xs={12} sm={12} md={6} lg={4}
  //         sx={{
  //               '&:hover': {
  //               opacity: [0.9, 0.8, 0.7],
  //               },
  //           }}>
  //           <ClassCard
  //               courseName="CS 180" 
  //               professorName="C" 
  //               courseID="10000000"
  //               discordLink="https://discord.com/"
  //               groupmeLink="https://groupme.com/" />*/}

  //   )}
  // }

  export default ClassList

