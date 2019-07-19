import React from 'react';
import ReactDOM from "react-dom";
import YouTube from 'react-youtube';
import TapeCoverImage from './TapeCoverImage.jsx';
import PlayerSongList from './PlayerSongList.jsx';

class MixtapePlayer extends React.Component {
constructor(props){
    super(props);
    this.state = {
        player1: null,
        player2: null,
        aSideLinks: ['4D2qcbu26gs', "r52KqG4G678", "Rht7rBHuXW8"],
        bSideLinks: ["8ahU-x-4Gxw", "H1Zm6E6Sy4Y", "fpsOOrwF558"],
    }
    this.onReadyOne = this.onReadyOne.bind(this);
    this.onReadyTwo = this.onReadyTwo.bind(this);
}
    onReadyOne(event) {
        this.setState({
            player1: event.target,
        });
        this.state.player1.loadPlaylist({playlist: this.state.bSideLinks});

    }

    onReadyTwo(event) {
        this.setState({
            player2: event.target,
        });
    }

    render (){
        return(
        <div>
            <TapeCoverImage />
            <YouTube videoId={'4D2qcbu26gs'} onReady={this.onReadyOne} />
                <YouTube videoId={'4D2qcbu26gs'} onReady={this.onReadyTwo} />
            <PlayerSongList />
        </div>
        )
    };
}
export default MixtapePlayer;