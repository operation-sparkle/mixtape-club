import React from 'react';
import LisaFrankenstein from '../assets/img/tapes/lisa-frankenstein-tape.gif';
import GreenTape from '../assets/img/tapes/green-tape.gif';
import OrangeTape from '../assets/img/tapes/orange-tape.gif';

const PlaylistImageSelector = () => {
    return (
        <div className="row">
            <div className="card tape-image-card">
                <img className="card-img-top" src={LisaFrankenstein} alt="Card image cap"/>
                    <div className="card-body">
                        <p className="card-text">Select Lisa Frankenstein Tape.</p>
                    </div>
            </div>
            <div className="card tape-image-card">
                <img className="card-img-top" src={GreenTape} alt="Card image cap" />
                <div className="card-body">
                    <p className="card-text">Select Green Tape.</p>
                </div>
            </div>
            <div className="card tape-image-card">
                <img className="card-img-top" src={OrangeTape} alt="Card image cap" />
                <div className="card-body">
                    <p className="card-text">Select Orange Tape.</p>
                </div>
            </div>
        </div>
    )
};

export default PlaylistImageSelector;