import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'

const PlayerSongList = (props) => {
    const { onDeckSideA, onDeckSideB } = props;

    return (

        <div className="border border-info playlist-builder shadow-sm p-3 mb-5 bg-white rounded">
            <div className="row">
                <div className="col-sm-4 col-md-2" style={{ marginTop: "1rem" }}>
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Side A</a>
                        <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Side B</a>
                    </div>
                </div>
                <div className="col-sm-4 col-md-5">
                    <div className="tab-content" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                            <ul className="list-group list-group-flush builder-tracks">
                                <li className="list-group-item track-li">{onDeckSideA[0]} <FontAwesomeIcon icon={faMinusCircle} style={{ float: 'right', color: '#17a2b8' }} /></li>
                                <li className="list-group-item track-li">{onDeckSideA[1]} <FontAwesomeIcon icon={faMinusCircle} style={{ float: 'right', color: '#17a2b8' }} /></li>
                                <li className="list-group-item track-li">{onDeckSideA[2]} <FontAwesomeIcon icon={faMinusCircle} style={{ float: 'right', color: '#17a2b8' }} /></li>
                                <li className="list-group-item track-li">{onDeckSideA[3]} <FontAwesomeIcon icon={faMinusCircle} style={{ float: 'right', color: '#17a2b8' }} /></li>
                                <li className="list-group-item track-li">{onDeckSideA[4]} <FontAwesomeIcon icon={faMinusCircle} style={{ float: 'right', color: '#17a2b8' }} /></li>
                            </ul>
                        </div>
                        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                            <ul className="list-group list-group-flush builder-tracks">
                                <li className="list-group-item track-li">{onDeckSideB[0]} <FontAwesomeIcon icon={faMinusCircle} style={{ float: 'right', color: '#17a2b8' }} /></li>
                                <li className="list-group-item track-li">{onDeckSideB[1]} <FontAwesomeIcon icon={faMinusCircle} style={{ float: 'right', color: '#17a2b8' }} /></li>
                                <li className="list-group-item track-li">{onDeckSideB[2]} <FontAwesomeIcon icon={faMinusCircle} style={{ float: 'right', color: '#17a2b8' }} /></li>
                                <li className="list-group-item track-li">{onDeckSideB[3]} <FontAwesomeIcon icon={faMinusCircle} style={{ float: 'right', color: '#17a2b8' }} /></li>
                                <li className="list-group-item track-li">{onDeckSideB[4]} <FontAwesomeIcon icon={faMinusCircle} style={{ float: 'right', color: '#17a2b8' }} /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

<ul className="list-group col-sm-10 col-md-8 search-list">
    <li className="list-group-item active bg-info">Tracks:</li>
    <li className="list-group-item">Track 1</li>
    <li className="list-group-item">Track 2</li>
    <li className="list-group-item">Track 3</li>
    <li className="list-group-item">Track 4</li>
</ul>


export default PlayerSongList;