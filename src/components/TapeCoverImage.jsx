import React from 'react';

import LisaFrankenstein from '../assets/img/tapes/lisa-frankenstein-tape.gif';
import CassetteDeck from '../assets/img/cassette-deck.png';

const TapeCoverImage = () => {
    return (
        <div>
            <img className="card-img-top col-md-12 tape-deck-image" src={CassetteDeck} alt="Card image cap" />
            <img className="card-img-top col-md-6 tape-cover-image" src={LisaFrankenstein} alt="Card image cap" />
        </div>
    )
}

export default TapeCoverImage;