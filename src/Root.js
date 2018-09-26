import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

//Routing을 위한 BrowserRouter 활용
const Root = () => (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

export default Root;