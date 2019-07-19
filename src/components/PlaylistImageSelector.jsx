import React from 'react';

import TapeImageCard from './TapeImageCard.jsx';
import TapeLabel from './TapeLabel.jsx';

const PlaylistImageSelector = (props) => {
    const { tapeImages, selectImage, onLabelChange } = props;
    return (
        <div className="mx-auto" style={{maxWidth: "800px"}}>
        <h5>Choose your tape:</h5>
            <div className="row">
                {tapeImages.map((tapeImage, i) => <TapeImageCard tapeImage={tapeImage} key={i} selectImage={selectImage}/>)}
            </div>
            <TapeLabel onLabelChange={onLabelChange}  />
            <div className="row">
                <button className="btn btn-info col-4 col-md-2 mx-auto" type="submit">Save Tape</button>
            </div>
        </div>
    )
};

export default PlaylistImageSelector;