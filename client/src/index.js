import * as React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme';
import LoginPage from "./components/loginPage"
import RegisterPage from "./components/registerPage";
import Test from "./testing/testPage";
import HomePage from './components/homePage';
import SearchPage from "./components/searchPage"
import ProfilePage from './components/profilePage';
import ResetPasswordPage from "./components/resetPasswordPage";

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        {/* Setup react routes for page redirection */}
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={HomePage}/>
                <Route path="/register" component={RegisterPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/resetPassword" component={ResetPasswordPage}/>
                <Route path="/search" component={SearchPage}/>
                <Route path="/profile" component={ProfilePage}/>
                <Route path="/test" component={Test}/>
            </Switch>
        </BrowserRouter>
    </ThemeProvider>,
    document.querySelector('#root'),
);
