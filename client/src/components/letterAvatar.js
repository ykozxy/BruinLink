import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { render } from 'react-dom';
import Cookies from 'js-cookie';
import bruin from '../images/bruin.jpg'

class LetterAvatars extends React.Component{
    render(){
        {
            //let avatar=Cookies.get("email");
            //let avatar="ABC"
        
        return (
            <Stack direction="row" spacing={2}>
              {/* <Avatar>A</Avatar>
              <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar> */}
              <Avatar alt="Bruin" src={bruin} />
            </Stack>
          )
        }
    }

}

export default LetterAvatars