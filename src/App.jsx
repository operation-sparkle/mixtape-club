import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from "./components/Container.jsx";
import LoginBox from './components/Login.jsx';
import Navigation from './components/Navbar.jsx';
import Search from './components/Search.jsx';
import Hero from './components/Hero.jsx';
import SearchList from './components/SearchList.jsx';
import PlaylistBuilderList from './components/PlaylistBuilderList.jsx';
import PlaylistImageSelector from './components/PlaylistImageSelector.jsx';

import LisaFrankenstein from './assets/img/tapes/lisa-frankenstein-tape.gif';
import GreenTape from './assets/img/tapes/green-tape.gif';
import OrangeTape from './assets/img/tapes/orange-tape.gif';
import BlueTape from './assets/img/tapes/blue-tape.gif';
import RedTape from './assets/img/tapes/red-tape.gif';
import PinkTape from './assets/img/tapes/pink-tape.gif';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [{ snippet: { title: 'Music is cool' }, id: { videoId: '4D2qcbu26gs' }}],
            query: '',
            player: null,
            tapeImages: [{ image: LisaFrankenstein, name: 'Lisa Frankenstein' }, { image: GreenTape, name: 'green' }, { image: OrangeTape, name: 'orange' }, { image: BlueTape, name: 'blue' }, { image: RedTape, name: 'red' }, { image: PinkTape, name: 'pink' }],
        }
        this.onSearch = this.onSearch.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onPlayVideo = this.onPlayVideo.bind(this);
        this.onReady = this.onReady.bind(this);

    }

    onChange(event){
        this.setState({
            query: event.target.value,
        })
    }

    onPlayVideo() {
        console.log('play');
        this.state.player.playVideo();
    }

    onReady(event) {
        console.log(`YouTube Player has been saved to state.`); // eslint-disable-line
        this.setState({
            player: event.target,
        });
    }

    onSearch(){
        console.log(this.state.query);
        let query = this.state.query;
        axios.post('/search', {query})
        .then((response)=>{
            console.log(response);
            this.setState({
                searchResults : response.data.items,
            })
        })
        .catch((err)=> {
            console.error('Error searching:', err)
        })
    }
    render() {
        const { searchResults, tapeImages } = this.state;
        return (
            <Router>
                <div className="App">
                    <Navigation />
                    <Container onReady={this.onReady} onPlayVideo={this.onPlayVideo} onChange={this.onChange} onSearch={this.onSearch} searchResults={searchResults} tapeImages={tapeImages} />
                </div>
            </Router>
        );
    }
}

// <div className="App">
//     <Navigation />
//     <Hero />
//     <Search onChange={this.onChange} onSearch={this.onSearch} />
//     <LoginBox />
//     <SearchList searchResults={searchResults} />
//     <PlaylistImageSelector />
//     <PlaylistBuilderList />
//     <footer className="text-info bg-light">Created by Team Operation Sparkle.</footer>
// </div>

ReactDOM.render(<App />, document.getElementById("app"));