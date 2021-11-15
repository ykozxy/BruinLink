import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import RegisterPage from "./components/registerPage";
import LoginPage from "./components/loginPage";
import {Redirect} from "react-router";
import Test from "./testing/testPage";


export default class ClientRouters extends React.Component {
    render() {
        return (
            /* Setup react routes for page redirection */
            <BrowserRouter>
                <Route path="/">
                    {/* TODO: put main page here and replace the Redirect element */}
                    <Redirect to="/login"/>
                </Route>
                <Route path="/register" component={RegisterPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/test" component={Test}/>
            </BrowserRouter>
        );
    }
}
