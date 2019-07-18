import React from 'react';

const TapeImageCard = (props) => {
    const { tapeImage, selectImage } = props;
    return (
        <div className="card tape-image-card" onClick={() => selectImage(tapeImage)}>
            <img className="card-img-top" src={tapeImage.image} alt="Card image cap" />
            <div className="card-body">
                <p className="card-text">Select {tapeImage.name} tape.</p>
            </div>
        </div>
    )
}

export default TapeImageCard