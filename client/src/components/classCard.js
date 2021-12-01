import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from "prop-types";
import {mdiDiscord, mdiWechat} from "@mdi/js";
import ClassCardGroupChatBar from "./classCardGroupChatBar";
import {default as Groupme} from "../icons/groupme.svg";
import CoursePopup from "../components/coursePopup";
import Cookies from 'js-cookie';
import AlertToast from "./alertToast";
import {Box} from "@mui/material";

export default class classCard extends React.Component{

constructor(props) {
    super(props);
    this.state = {
      open: false,
      showAlert:false
  };
    this.handleClick = this.handleClick.bind(this);
}

handleClick(){
  let c = Cookies.get("accountID");
  //let c = "123";
        if (!c) {
          this.setState({showAlert:true});
          return;
        }
  this.setState({open: true})

}

static propTypes = {
  courseName: PropTypes.string.isRequired,
  professorName: PropTypes.string.isRequired,
  courseID: PropTypes.string.isRequired,
  wechatCode: PropTypes.bool,
  discordLink: PropTypes.bool,
  groupmeLink: PropTypes.bool,
}
  
render() {  
return (
    <Card sx={{ 
        width: 230,
        border: 1,
        borderColor: 'grey.500',
        }}>
      <CardContent>
          <Box height = {95}>
              <Typography variant="h5" component="div">
                  {this.props.courseName}
              </Typography>
              <Typography sx={{mb: 1.5}} color="text.secondary">
                  {this.props.professorName}
              </Typography>
          </Box>
        <div/>
        <ClassCardGroupChatBar 
          name="Discord"
          id={this.props.courseID}
          link={this.props.discordLink}
          iconSvgPath={mdiDiscord}
          iconColor="#5969ea"/>
        <ClassCardGroupChatBar name="Groupme"
          id={this.props.courseID}
          link={this.props.groupmeLink}
          iconImg={Groupme}/>
        <ClassCardGroupChatBar name="WeChat"
          id={this.props.courseID}
          link={this.props.wechatCode}
          iconSvgPath={mdiWechat}
          iconColor="#5ecc72"/>
      </CardContent>

      <CardActions>
        <Button size="small" sx={{mt: -1}}
          onClick={this.handleClick}>
          Learn More
        </Button>
        
        <AlertToast alertMessage="Please login before viewing details!"
          showAlert={this.state.showAlert}
          onClose={() => this.setState({showAlert: false})}
          severity="warning"/>

        <CoursePopup 
          open={this.state.open}
          onClose={() => this.setState({open: false})}
          courseName={this.props.courseName}
          professorName={this.props.professorName}
          courseID={this.props.courseID}
          />
      </CardActions>

    </Card>
  );
}
}

// export default ClassCard;
// function Card(props) {
//   return (
//     <div>
//       <li className='cards__item'>
//           <figure className='cards__item__pic-wrap' data-category={props.label}>
//             <img
//               className='cards__item__img'
//               alt='Travel Image'
//               src={props.src}
//             />
//           </figure>
//           <div className='cards__item__info'>
//             <h5 className='cards__item__text'>{props.text}</h5>
//           </div>
//       </li>
//     </div>
//   );
// }

// export default Card;