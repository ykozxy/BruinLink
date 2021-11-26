import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { render } from 'react-dom';
import Cookies from 'js-cookie';

class LetterAvatars extends React.Component{
    render(){
        {
            let avatar=Cookies.get("accountID");
            //let avatar="ABC"
        
        return (
            <Stack direction="row" spacing={2}>
              {/* <Avatar>A</Avatar>
              <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar> */}
              <Avatar sx={{ bgcolor: deepPurple[500] }}>{avatar}</Avatar>
            </Stack>
          )
        }
    }

}

export default LetterAvatars