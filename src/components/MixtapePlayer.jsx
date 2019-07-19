import React from 'react';
import ReactDOM from "react-dom";
import YouTube from 'react-youtube';
import TapeCoverImage from './TapeCoverImage.jsx';
import PlayerSongList from './PlayerSongList.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

class MixtapePlayer extends React.Component {
constructor(props){
    super(props);
    this.state = {
        player: null,
        playing: false,
        aSideLinks: ['4D2qcbu26gs', "r52KqG4G678", "Rht7rBHuXW8"],
        bSideLinks: ["8ahU-x-4Gxw", "H1Zm6E6Sy4Y", "fpsOOrwF558"],
        interval: null,
        playListId: null || this.props.location
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
        marginTop: '-300px'
        }

    this.iconStyle = {
        fontSize: '2.5rem',
        marginTop: '15%',
    }
}

    componentWillMount(){
        if(this.state.playListId){
            const {search} = this.state.playListId;
            let id = search.slice(4).replace(/%22/g, '"');
            axios.post('mixtape-player', {
                id,
            })
                .then(function (response) {
                    // handle success
                    console.log(response);
                })
                .catch(function (error) {
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
        const { onDeckSideA, onDeckSideB, location } = this.props;
        return(
        <div>
            <TapeCoverImage />
            <YouTube videoId={'4D2qcbu26gs'} onReady={this.onReady} />
                <div className="row col-9 bg-info d-flex align-items-center" style={this.divStyle}>
                    <div className="col-2" >
                        <FontAwesomeIcon style={this.iconStyle} icon={faPause} onClick={this.onPauseVideo} /> 
                            <FontAwesomeIcon style={this.iconStyle} icon={faPlay} onClick={this.onPlayVideo} />
                            <FontAwesomeIcon style={this.iconStyle} icon={faForward} onMouseDown={this.onForward} onMouseUp={this.onStopForward} />
                            <FontAwesomeIcon style={this.iconStyle} icon={faBackward} onMouseDown={this.onBackward} onMouseUp={this.onStopBackward} />
                    </div>
        </div>
                <PlayerSongList onDeckSideA={onDeckSideA} onDeckSideB={onDeckSideB} />
        </div>
        )
    };
}
export default MixtapePlayer;