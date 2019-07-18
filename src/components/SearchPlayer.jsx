import React from 'react';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'


const SearchPlayer = (props) => {
    const {onReady, onPlayVideo, onPauseVideo, playing, searchResults, selectedResult } = props;

   
    const iconStyle = {
        fontSize: '2.5rem',
        marginTop: '15%',
    }
    const divStyle = {
        borderRadius: '5px',
        marginTop: '-300px'
    }

    const titleStyle = {
        verticalAlign: 'middle',
        display: 'inline-block',
    }
    
    const vidStyle = {
        opacity: '0%',
        marginLeft: '-1000px'
    }
    return (
        <div>
            <div style={vidStyle}>
            <YouTube videoId={selectedResult.id.videoId} onReady={onReady} />
            </div>
            <div className="row col-9 bg-info d-flex align-items-center" style={divStyle}>
            <div className="col-2" >
            {playing ? <FontAwesomeIcon style={iconStyle} icon={faPause} onClick={onPauseVideo}/>:
            <FontAwesomeIcon style={iconStyle} icon={faPlay} onClick={onPlayVideo}/> }
            
            </div>
            <div className="col-9">
             <h3 style={titleStyle}>
             {selectedResult.snippet.title}
             </h3> 
                </div>
            </div>
        </div>
    )
};

export default SearchPlayer;