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

        this.state = {
            open: false,
            query: null,
            department: null,
            division: null
        };
       
    }

    componentWillMount() {
        const queryParams = new URLSearchParams(window.location.search);
        let query = queryParams.get('query');
        let department = queryParams.get('department');
        let division = queryParams.get('division');


        // if (query) console.log(query);
        // if (department) console.log(department);
        // if (division) console.log(division);
        this.state.query=query;
        this.state.department=department;
        this.state.division=division;

        //if (this.state.query) console.log("query:"+this.state.query);
        // if (this.state.department) console.log("depa:"+this.state.department);
        // if (this.state.division) console.log("division:"+this.state.division);
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
                                <FilterBox/>
                                <ClassList/>
                            </Box>
                        </div>
                    )
                  }
            //console.log("??query??"+this.state.query)
        }
        return (
            <div>
                <Navbar isLogin={true}/>
                <Box width={"100%"} sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    mt: 5,
                }}>
                    <FilterBox/>
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