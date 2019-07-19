import React from 'react';

const TapeImageCard = (props) => {
    const { tapeImage, selectImage, tapeBackgroundColor } = props;
    console.log(tapeBackgroundColor);
    return (
        <div className="card tape-image-card" style={{ backgroundColor: tapeBackgroundColor }} onClick={(event) => selectImage(event, tapeImage)}>
            <img className="card-img-top" src={tapeImage.image} alt="Card image cap" />  
        </div>
    )
}

export default TapeImageCard