import React from 'react';

import TapeImageCard from './TapeImageCard.jsx';
import TapeLabel from './TapeLabel.jsx';

const PlaylistImageSelector = (props) => {
    const { tapeImages, selectImage, onLabelChange } = props;
    return (
        <div>
            <div className="row">
                {tapeImages.map((tapeImage, i) => <TapeImageCard tapeImage={tapeImage} key={i} selectImage={selectImage}/>)}
            </div>
            <TapeLabel onLabelChange={onLabelChange}  />
        </div>
    )
};

export default PlaylistImageSelector;