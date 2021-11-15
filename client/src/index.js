import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import theme from './theme';
import ClientRouters from "./clientRouters";


ReactDOM.render(
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <ClientRouters/>
    </ThemeProvider>,
    document.querySelector('#root'),
);
