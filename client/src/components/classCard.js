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

export default class classCard extends React.Component{

constructor(props) {
    super(props);
    this.state = {
      open: false,
  };
}

static propTypes = {
  courseName: PropTypes.string.isRequired,
  courseSection: PropTypes.string.isRequired,
  courseID: PropTypes.string.isRequired,
  wechatCode: PropTypes.string,
  discordLink: PropTypes.string,
  groupmeLink: PropTypes.string,
}
  
render() {  
return (
    <Card sx={{ 
        width: 230,
        border: 1,
        borderColor: 'grey.500',
        }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {this.props.courseName}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {this.props.courseSection}
        </Typography>
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
        <Button size="small"
          onClick={() => this.setState({open: true})}>
          Learn More
        </Button>
        <CoursePopup 
          open={this.state.open}
          onClose={() => this.setState({open: false})}
          courseName={this.props.courseName}
          courseSection={this.props.courseSection}
          courseID={this.props.courseID}
          wechatCode={this.props.wechatCode}
          discordLink={this.props.discordLink}
          groupmeLink={this.props.groupmeLink}
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