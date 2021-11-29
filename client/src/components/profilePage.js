import React from 'react'
import Navbar from "./navbar";
import Cookies from 'js-cookie';

class ProfilePage extends React.Component{
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
                <h1 className='profilePage'>This is your profile</h1>
            </div>
        )
    }

}

export default ProfilePage