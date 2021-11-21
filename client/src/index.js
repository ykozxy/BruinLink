import * as React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme';
import LoginPage from "./components/loginPage"
import RegisterPage from "./components/registerPage";
import Navbar from "./components/navbar";
import Test from "./testing/testPage";
import HomePage from './components/homePage';
import SearchPage from "./components/searchPage"

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        {/* Setup react routes for page redirection */}
        <BrowserRouter>
            <Navbar/>
            <Switch>
                {/*<Route path="/" exact>
                    {/* TODO: put main page here and replace the Redirect element */}
                    {/* <Redirect to="/test"/>
                </Route>*/} 
                    <Route path="/" exact component={HomePage}/>
                    {/* TODO: put main page here and replace the Redirect element*/}
                <Route path="/register" component={RegisterPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/search" component={SearchPage}/>
                <Route path="/test" component={Test}/>
            </Switch>
        </BrowserRouter>
    </ThemeProvider>,
    document.querySelector('#root'),
);
