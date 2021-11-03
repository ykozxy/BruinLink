import * as React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme';
import LoginPage from "./components/loginPage"
import RegisterPage from "./components/registerPage";


ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        {/* Setup react routes for page redirection */}
        <BrowserRouter>
            <Route path="/">
                {/* TODO: put main page here and replace the Redirect element */}
                <Redirect to="/login"/>
            </Route>
            <Route path="/register" component={RegisterPage}/>
            <Route path="/login" component={LoginPage}/>
        </BrowserRouter>
    </ThemeProvider>,
    document.querySelector('#root'),
);
