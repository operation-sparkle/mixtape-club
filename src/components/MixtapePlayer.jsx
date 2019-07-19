import React from 'react';
import ReactDOM from "react-dom";
import YouTube from 'react-youtube';
import TapeCoverImage from './TapeCoverImage.jsx';
import PlayerSongList from './PlayerSongList.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { basename } from 'path';

class MixtapePlayer extends React.Component {
constructor(props){
    super(props);
    this.state = {
        player: null,
        playing: false,
        aSideLinks: ['4D2qcbu26gs', "r52KqG4G678", "Rht7rBHuXW8"],
        bSideLinks: ["8ahU-x-4Gxw", "H1Zm6E6Sy4Y", "fpsOOrwF558"],
        interval: null,
        playListId: null || this.props.location,
        aSideTitles: ['placeholder'],
        bSideTitles: ['placeholder']
    }
    this.onReady = this.onReady.bind(this);
    this.onPlayVideo = this.onPlayVideo.bind(this);
    this.onPauseVideo = this.onPauseVideo.bind(this);
    this.onForward = this.onForward.bind(this);
    this.onStopForward = this.onStopForward.bind(this);
    this.onBackward = this.onBackward.bind(this);
    this.onStopBackward = this.onStopBackward.bind(this);

    this.divStyle = {
        borderRadius: '5px',
        marginTop: '-360px'
        }

    this.iconStyle = {
        fontSize: '2.5rem',
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
            let id = search.slice(4).replace(/%22/g, '"');
            axios.post('mixtape-player', {
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
                            bSideTitles: bTitleArray
                        })
                    } else {
                        const { aSide,tapeDeck, tapeLabel, userId } = response.data;
                        aSide.forEach(video => {
                            aVideoArray.push(video.id.videoId);
                            aTitleArray.push(video.snippet.title);
                        })
                        this.setState({
                            aSideLinks: aVideoArray,
                            aSideTitles: aTitleArray
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
        this.state.player.loadPlaylist({playlist: this.state.bSideLinks});
    }

    onPlayVideo(){
        console.log('play');
        this.state.player.playVideo();
        this.setState({
            playing: true,
        })
    }
    
    onPauseVideo(){
        console.log('pause');
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
    render (){
        const { onDeckSideA, onDeckSideB } = this.props;
        const { aSideLinks, bSideLinks, aSideTitles, bSideTitles} = this.state
        return(
        <div>
            <h4 className="player-tape-label">Mixtape Title</h4>
            <TapeCoverImage />
            <YouTube className="YouTube-vid" videoId={aSideLinks[0]} onReady={this.onReady} />
                <div className="row col-6 d-flex align-items-center player-ui mx-auto" style={this.divStyle}>
                    <div className="row col-12" >
                    <FontAwesomeIcon className="col-3 ui-button" style={this.iconStyle} icon={faBackward} onMouseDown={this.onBackward} onMouseUp={this.onStopBackward} />
                        <FontAwesomeIcon className="col-3 ui-button" style={this.iconStyle} icon={faPause} onClick={this.onPauseVideo} /> 
                        <FontAwesomeIcon className="col-3 ui-button" style={this.iconStyle} icon={faPlay} onClick={this.onPlayVideo} />
                        <FontAwesomeIcon className="col-3 ui-button" style={this.iconStyle} icon={faForward} onMouseDown={this.onForward} onMouseUp={this.onStopForward} />
                    </div>
        </div>
                <PlayerSongList aSideTitles={aSideTitles} bSideTitles={bSideTitles} />
        </div>
        )
    };
}
export default MixtapePlayer;