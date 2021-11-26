import React from 'react'
import ClassList from "./classList";
import Navbar from "./navbar";
import Cookies from 'js-cookie';

class SearchPage extends React.Component {
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
                            <ClassList /> 
                        </div>
                    )
                  }
        }
        return (
            <div>
                <Navbar isLogin={true} />
                <ClassList /> 
            </div>
        )
    }
}


export default SearchPage
