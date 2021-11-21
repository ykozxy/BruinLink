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
                             courseID="10000000"
                             discordLink="https://discord.com/"
                             groupmeLink={"https://groupme.com/"}
                    // wechatCode="https://pbs.twimg.com/profile_images/1087188469397344257/HXxlDWIf_400x400.jpg"
                />
            </div>
        )
    }
}
