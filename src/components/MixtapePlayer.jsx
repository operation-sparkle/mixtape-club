import React from 'react';

import TapeCoverImage from './TapeCoverImage.jsx';
import PlayerSongList from './PlayerSongList.jsx';

const MixtapePlayer = (props) => {
    const { onDeckSideA, onDeckSideB } = props;
    
    return (
        <div>
            <TapeCoverImage />
            <PlayerSongList onDeckSideA={onDeckSideA} onDeckSideB={onDeckSideB} />
        </div>
    )
}

export default MixtapePlayer;