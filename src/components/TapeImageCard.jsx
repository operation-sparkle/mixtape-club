import React from 'react';

const TapeImageCard = (props) => {
    const { builderImage, tapeImage, selectImage, tapeBackgroundColor } = props;
    return (
        <div className="card tape-image-card" style={(builderImage === tapeImage) ? { backgroundColor: '#17a2b8'} :{ backgroundColor: tapeBackgroundColor }} onClick={(event) => selectImage(event, tapeImage)}>
            <img className="card-img-top" src={tapeImage.image} alt="Card image cap" />  
        </div>
    )
}

export default TapeImageCard