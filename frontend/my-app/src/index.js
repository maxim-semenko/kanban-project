import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        {/*<Provider store={store}>*/}
        {/*    <ThemeProvider theme={theme}>*/}
                <App/>
            {/*</ThemeProvider>*/}
        {/*</Provider>*/}
    </BrowserRouter>,
    document.getElementById('root')
);


