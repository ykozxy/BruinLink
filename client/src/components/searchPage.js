import React from 'react'
import ClassList from "./classList";
import Navbar from "./navbar";
import Cookies from 'js-cookie';
import FilterBox from "../components/courseFilter";
import {withRouter} from "react-router";
import {Box} from "@mui/material";

export default withRouter(class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        const queryParams = new URLSearchParams(window.location.search);
        let query = queryParams.get('query');
        let department = queryParams.get('department');
        let division = queryParams.get('division');

        this.state = {
            open: false,
            query: query,
            department: department,
            division : division,
        };
    }

    render(){
        {
            let c = Cookies.get("accountID");
            //let c = "123";
                  if (!c) {
                    return (
                        <div>
                            <Navbar isLogin={false}/>
                            <Box width={"100%"} sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                mt: 5,
                            }}>
                                <FilterBox query={this.state.query}
                                           department={this.state.department}
                                           division={this.state.division}/>
                                <ClassList/>
                            </Box>
                        </div>
                    )
                  }
            //console.log("??query??"+this.state.query)
        }
        return (
            <div>
                <Navbar isLogin={true} query={this.state.query}/>
                <Box width={"100%"} sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    mt: 5,
                }}>
                    <FilterBox query={this.state.query}
                               department={this.state.department}
                               division={this.state.division}/>
                    <ClassList 
                        courseName={this.state.query}
                        department={this.state.department}
                        division={this.state.division}  
                        />
                </Box>
            </div>
        )
    }
})