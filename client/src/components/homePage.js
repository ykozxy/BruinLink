import React from 'react'
import "./homePage.css";
import Navbar from "./navbar";
import Cookies from 'js-cookie';

class HomePage extends React.Component {
    constructor(props) {
        super(props);       

    }

    render(){
        {
            let c = Cookies.get("accountID");
            //let c = "123";
                  if (!c) {
                    return (
                        <div>
                            <Navbar isLogin={false} />
                            <h1 className='homePage'>Welcome!!</h1>
                        </div>
                    )
                  }
        }
        return (
            <div>
                <Navbar isLogin={true} />
                <h1 className='homePage'>Welcome!!</h1>
            </div>
        )
    }
}

export default HomePage

