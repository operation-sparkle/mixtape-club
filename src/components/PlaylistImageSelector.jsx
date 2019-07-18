import React from 'react';

import TapeImageCard from './TapeImageCard.jsx';

const PlaylistImageSelector = (props) => {
    const { tapeImages } = props;
    return (
        <div className="row">
            {tapeImages.map((tapeImage, i) => <TapeImageCard tapeImage={tapeImage} key={i} />)}
        </div>
    )
};

export default PlaylistImageSelector;