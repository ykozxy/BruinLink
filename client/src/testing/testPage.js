import React from "react";
import {Box} from "@mui/material";
import Navbar from "../components/navbar";
import ClassList from "../components/classList";
import FilterBox from "../components/courseFilter";
import {withRouter} from "react-router";
import SearchBar from "../components/searchBar";


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
            </div>
        )
    }
})
