import React from 'react';

import LisaFrankenstein from '../assets/img/tapes/lisa-frankenstein-tape.gif';

const PlaylistBuilderList = (props) => {
    const { builderImage, tapeLabel } = props;
    return (
        <div className="border border-info playlist-builder shadow-sm p-3 mb-5 bg-white rounded">
        <div className="row">
                <div className="col-md-4" style={{ marginTop: ".5rem" }}>
                    <h5 style={{ textAlign: "center" }}>Playlist Builder:</h5>
                    <img className="col-md-12" src={builderImage.image}/>
                    <p style={{ margin: ".5rem 1rem" }}><b>Label:</b>{tapeLabel}</p>
                 </div>
                <div className="col-2" style={{marginTop: "1rem"}}>
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Side A</a>
                        <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Side B</a>
                    </div>
                </div>
                <div className="col-5">
                    <div className="tab-content" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                            <ul className="list-group list-group-flush builder-tracks">
                                <li className="list-group-item track-li">Track 1 A</li>
                                <li className="list-group-item track-li">Track 2 A</li>
                                <li className="list-group-item track-li">Track 3 A</li>
                                <li className="list-group-item track-li">Track 4 A</li>
                                <li className="list-group-item track-li">Track 5 A</li>
                            </ul>
                        </div>
                        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                            <ul className="list-group list-group-flush builder-tracks">
                                <li className="list-group-item track-li">Track 1 B</li>
                                <li className="list-group-item track-li">Track 2 B</li>
                                <li className="list-group-item track-li">Track 3 B</li>
                                <li className="list-group-item track-li">Track 4 B</li>
                                <li className="list-group-item track-li">Track 5 B</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default PlaylistBuilderList;