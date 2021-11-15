import React from "react";
import {Button} from "@mui/material";
import CoursePopup from "../components/coursePopup";


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
                <Button onClick={() => this.setState({open: true})}>
                    Open popup
                </Button>
                <CoursePopup open={this.state.open}
                             onClose={() => this.setState({open: false})}
                             courseName="CS 35L"
                             courseSection="Lec 1"
                             discordLink="" groupmeLink="" wechatCode=""/>
            </div>
        )
    }
}
