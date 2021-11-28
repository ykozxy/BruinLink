import React from "react";
import {Box} from "@mui/material";
import Navbar from "../components/navbar";
import ClassList from "../components/classList";
import FilterBox from "../components/courseFilter";


export default class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
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
            </div>
        )
    }
}
