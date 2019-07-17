import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginBox from './components/Login.jsx';
import Navigation from './components/Navbar.jsx';
import Search from './components/Search.jsx';
import Hero from './components/Hero.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="App">
            < Navigation />
                < Hero />
                < Search />
                < LoginBox />
            <footer className="text-info bg-light">Created by Team Operation Sparkle.</footer>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));