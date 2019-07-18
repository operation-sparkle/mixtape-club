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
import { cpus } from "os";

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
            searchResults: [{ snippet: { title: '' }, id: { videoId: '4D2qcbu26gs' }}],
            player: null,
            tapeImages: [{ image: LisaFrankenstein, name: 'Lisa Frankenstein' }, { image: GreenTape, name: 'green' }, { image: OrangeTape, name: 'orange' }, { image: BlueTape, name: 'blue' }, { image: RedTape, name: 'red' }, { image: PinkTape, name: 'pink' }],
            builderImage: { image: BlueTape, name: 'blue' },
            tapeLabel: 'Your label here',
            playing: false,
            query: '',
            selectedResult: { snippet: { title: 'Search for a song' }, id: { videoId: '4D2qcbu26gs' } },
        }
        this.onSearch = this.onSearch.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onPlayVideo = this.onPlayVideo.bind(this);
        this.onPauseVideo = this.onPauseVideo.bind(this);
        this.onReady = this.onReady.bind(this);
        this.onSelectTapeImage = this.onSelectTapeImage.bind(this);
        this.onTapeLabelChange = this.onTapeLabelChange.bind(this);
        this.onResultClick = this.onResultClick.bind(this);
    }
    
    onChange(event){
        this.setState({
            query: event.target.value,
        })
    }

    onPlayVideo() {
        this.state.player.playVideo();
        this.setState({
            playing: true,
        })
    }

    onPauseVideo() {
        console.log('stop');
        this.state.player.pauseVideo();
        this.setState({
            playing: false,
        })
    }

    onReady(event) {
        console.log(`YouTube Player has been saved to state.`); // eslint-disable-line
        this.setState({
            player: event.target,
        });
    }

    
    onSearch(){
        let query = this.state.query;
        axios.post('/search', {query})
        .then((response)=>{
            console.log(response);
            this.setState({
                searchResults : response.data.items,
                selectedResult : response.data.items[0],
            })
        })
        .catch((err)=> {
            console.error('Error searching:', err)
        })
    }

    onSelectTapeImage(tape) {
        this.setState({
            builderImage: tape,
        })
    }

    onTapeLabelChange(event) {
        this.setState({
            tapeLabel: event.target.value,
        })
    }

    onResultClick(selected) {
        this.setState({
            playing: true,
            selectedResult: selected,
        })
        setTimeout(()=>{
            this.state.player.playVideo();
        },0);
    }
    render() {
        const { searchResults, playing, selectedResult, tapeImages, builderImage, tapeLabel } = this.state;
        return (
            <Router>
                <div className="App">
                    <Navigation />
                    <Container onReady={this.onReady} onPauseVideo={this.onPauseVideo} onPlayVideo={this.onPlayVideo} onChange={this.onChange} onSearch={this.onSearch} onResultClick={this.onResultClick} playing={playing} searchResults={searchResults} tapeImages={tapeImages} builderImage={builderImage} selectImage={this.onSelectTapeImage} tapeLabel={tapeLabel} onLabelChange={this.onTapeLabelChange} selectedResult={selectedResult}/>
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