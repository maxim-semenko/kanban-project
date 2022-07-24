import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {unstable_createMuiStrictModeTheme} from '@mui/material/styles';
import {ThemeProvider} from "@mui/styles";
import store from "./redux/Store";
import {Provider} from "react-redux";

const theme = unstable_createMuiStrictModeTheme();

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

