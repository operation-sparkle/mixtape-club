import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginBox from './components/Login.jsx';
import Navigation from './components/Navbar.jsx';
import Search from './components/Search.jsx';
import Hero from './components/Hero.jsx';
import SearchList from './components/SearchList.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: ['song1', 'song2', 'song3'],
        }
    }
    render() {
        const { searchResults } = this.state;
        return (
            <div className="App">
            <Navigation />
                <Hero />
                <Search />
                <LoginBox />
                <SearchList searchResults={searchResults} />
            <footer className="text-info bg-light">Created by Team Operation Sparkle.</footer>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));