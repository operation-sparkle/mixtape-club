import React from 'react';
import ReactDOM from "react-dom";
import YouTube from 'react-youtube';
import TapeCoverImage from './TapeCoverImage.jsx';
import PlayerSongList from './PlayerSongList.jsx';
import UserMixtapesList from './UserMixtapes.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import { library, config } from '@fortawesome/fontawesome-svg-core'
// config.autoAddCss = false
import axios from 'axios';
import { basename } from 'path';

import LisaFrankenstein from '../assets/img/tapes/lisa-frankenstein-tape.gif';


class MixtapePlayer extends React.Component {
constructor(props){
    super(props);
    this.state = {
        player: null,
        playing: false,
        aSideLinks: ["r52KqG4G678", "Rht7rBHuXW8"],
        bSideLinks: ["H1Zm6E6Sy4Y", "fpsOOrwF558"],
        interval: null,
        playListId: null || this.props.location,
        aSideTitles: ['placeholder', 'spaceholder'],
        bSideTitles: ['placeholder'],
        tapeCover: LisaFrankenstein,
        sidePlaying: ["r52KqG4G678", "Rht7rBHuXW8"],
        tapeTitle: 'Untitled',
        currentSong: "",

    }
    this.onReady = this.onReady.bind(this);
    this.onPlayVideo = this.onPlayVideo.bind(this);
    this.onPauseVideo = this.onPauseVideo.bind(this);
    this.onForward = this.onForward.bind(this);
    this.onStopForward = this.onStopForward.bind(this);
    this.onBackward = this.onBackward.bind(this);
    this.onStopBackward = this.onStopBackward.bind(this);
    this.onFlip = this.onFlip.bind(this);
    this.checkVid = this.checkVid.bind(this);

    this.divStyle = {
        borderRadius: '5px',
        marginTop: '-360px'
        }

    this.iconStyle = {
        margin: '3% 0',
    }
}

    componentWillMount(){
        let aVideoArray = [];
        let bVideoArray = [];
        let aTitleArray = [];
        let bTitleArray = [];
        if(this.state.playListId){
            const {search} = this.state.playListId;
            // debugger;
            let id = search.slice(4);
            axios.post('/mixtape-player', {
                id,
            })
                .then((response) => {
                    if(response.data.bSide){
                        const {aSide, bSide, tapeDeck, tapeLabel, userId} = response.data;
                        aSide.forEach(video => {
                            aVideoArray.push(video.id.videoId);
                            aTitleArray.push(video.snippet.title);
                        })
                        bSide.forEach(video => {
                            bVideoArray.push(video.id.videoId);
                            bTitleArray.push(video.snippet.title);
                        })
                        this.setState({
                            aSideLinks: aVideoArray,
                            bSideLinks: bVideoArray,
                            aSideTitles: aTitleArray,
                            bSideTitles: bTitleArray,
                            tapeCover: tapeDeck,
                            sidePlaying: aVideoArray,
                            tapeTitle: tapeLabel
                        })
                    } else {
                        const { aSide, tapeDeck, tapeLabel, userId } = response.data;
                        aSide.forEach(video => {
                            aVideoArray.push(video.id.videoId);
                            aTitleArray.push(video.snippet.title);
                        })
                        this.setState({
                            aSideLinks: aVideoArray,
                            aSideTitles: aTitleArray,
                            tapeCover: tapeDeck,
                            sidePlaying: aVideoArray,
                            tapeTitle: tapeLabel
                        })
                    }   
                })
                .catch((error) => {
                    // handle error
                    console.log(error);
                })
        }
    }



    onReady(event) {
        this.setState({
            player: event.target,
        });
        this.state.player.loadPlaylist({playlist: this.state.sidePlaying});
    }

    onPlayVideo(){
        console.log('play');
        this.state.player.playVideo();
        this.setState({
            playing: true,
        })
    }
    

    onPauseVideo(){
        console.log(this.state.player.getVideoUrl());
        this.state.player.pauseVideo();
        this.setState({
            playing: false,
        })
    }

    onForward(){
       
        this.state.player.setPlaybackRate(2);
        this.state.player.setVolume(50);
    }

    onStopForward(){
        this.state.player.setPlaybackRate(1.0);
        this.state.player.setVolume(100);
    }

    onBackward(){
        console.log('reverse');
        let time = this.state.player.getCurrentTime();
        this.state.player.setVolume(50);
        this.state.interval = setInterval(()=> {
            time -= 2;
            this.state.player.seekTo(time);
        }, 90)
    }

    onStopBackward(){
        clearInterval(this.state.interval);
        this.state.player.playVideo();
        this.state.player.setVolume(100);
    }

    checkVid(event){
        if(event.data === 1){
            let urlId = this.state.player.getVideoUrl();
            urlId = urlId.replace('https://www.youtube.com/watch?v=','')
            console.log(urlId);
            if(this.state.currentSong !== urlId){
                this.setState({
                    currentSong: urlId,
                })
            }
        }
    }

    onFlip(){
        if(this.state.sidePlaying[0] === this.state.aSideLinks[0]){
            let sideB = this.state.bSideLinks;
            this.setState({
                sidePlaying: sideB,
            })       
            this.state.player.loadPlaylist({playlist: sideB});
        } else if(this.state.sidePlaying[0] === this.state.bSideLinks[0]){
            let sideA = this.state.aSideLinks;
            this.setState({
                sidePlaying: sideA,
            })
            this.state.player.loadPlaylist({ playlist: sideA });
        } 
    }
    render (){

        const { onDeckSideA, onDeckSideB } = this.props;
        const { aSideLinks, bSideLinks, aSideTitles, bSideTitles, tapeCover, tapeTitle, currentSong} = this.state
        return(
        <div>
            <h4 className="player-tape-label">{tapeTitle}</h4>
            <TapeCoverImage tapeCover={tapeCover} />
            <YouTube className="YouTube-vid" onReady={this.onReady} onStateChange={this.checkVid}/>
                <div className="row col-9 col-md-6 d-flex align-items-center player-ui mx-auto" style={this.divStyle}>
                    <div className="row col-12 col-md-12" >
                    <FontAwesomeIcon className="col-3 ui-button" style={this.iconStyle} icon={faBackward} onMouseDown={this.onBackward} onMouseUp={this.onStopBackward} />
                        <FontAwesomeIcon className="col-3 ui-button" style={this.iconStyle} icon={faPause} onClick={this.onPauseVideo} /> 
                        <FontAwesomeIcon className="col-3 ui-button" style={this.iconStyle} icon={faPlay} onClick={this.onPlayVideo} />
                        <FontAwesomeIcon className="col-3 ui-button" style={this.iconStyle} icon={faForward} onMouseDown={this.onForward} onMouseUp={this.onStopForward} />
                    </div>
                </div>
                <PlayerSongList onFlip={this.onFlip} currentSong={currentSong} aSideLinks={aSideLinks} bSideLinks={bSideLinks} aSideTitles={aSideTitles} bSideTitles={bSideTitles} />
                <UserMixtapesList />
        </div>
        )
    };
}
export default MixtapePlayer;