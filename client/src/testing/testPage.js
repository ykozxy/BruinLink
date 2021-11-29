import $ from "jquery";
import React from "react";
import {Box, Button} from "@mui/material";
import Navbar from "../components/navbar";
import ClassList from "../components/classList";
import FilterBox from "../components/courseFilter";
import {withRouter} from "react-router";
import SearchBar from "../components/searchBar";
import * as config from "../config"
import Cookies from "js-cookie";
import CoursePopup from "../components/coursePopup";


export default withRouter(class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    componentDidMount() {
        const queryParams = new URLSearchParams(window.location.search);
        let query = queryParams.get('query');
        let department = queryParams.get('department');
        let division = queryParams.get('division');

        if (query) console.log(query);
        if (department) console.log(department);
        if (division) console.log(division);

        let url = config.baseUrl + config.api.account.getEmail;
        let data = {token: Cookies.get("accountID")};
        console.log(url);
        console.log(data);
        $.post(url, data, "json")
            .done((d) => {
                console.log(d);
            })
            .fail((d) => {
                console.log(d);
            });
    }

    render() {
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
                    <ClassList/>
                </Box>
                <SearchBar/>
                <CoursePopup open={this.state.open}
                             onClose={() => this.setState({open: false})}
                             courseName="CS 35L"
                             professorName="Paul Eggert"
                             courseID="1"/>
                <Button onClick={() => this.setState({open: true})}>
                    OPEN
                </Button>
            </div>
        )
    }
})
