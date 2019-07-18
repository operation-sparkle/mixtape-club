import React from 'react';

import TapeImageCard from './TapeImageCard.jsx';

const PlaylistImageSelector = (props) => {
    const { tapeImages, selectImage } = props;
    return (
        <div className="row">
            {tapeImages.map((tapeImage, i) => <TapeImageCard tapeImage={tapeImage} key={i} selectImage={selectImage}/>)}
        </div>
    )
};

export default PlaylistImageSelector;