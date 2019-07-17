import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

import LoginBox from './components/Login.jsx';
import Navigation from './components/Navbar.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="App">
            < Navigation />
                <h1 id="title">Mixtape Club</h1>
                <h2 id="subtitle">A Modern App for Creating and Sharing Throwback Mixtapes</h2>
                < LoginBox />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));