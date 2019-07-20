import React from 'react';

import LisaFrankenstein from '../assets/img/tapes/lisa-frankenstein-tape.gif';


const TapeCoverImage = (props) => {
    const {tapeCover} = props
    return (
        <div>
            <img className="card-img-top col-md-10 tape-cover-image" src={tapeCover} alt="Card image cap" />
        </div>
    )
}

export default TapeCoverImage;