import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";

import Landing from "./Landing.jsx";
import Login from "./Login.jsx";
import CreateMixtapes from "./CreateMixtapes.jsx";
import MixtapePlayer from "./MixtapePlayer.jsx";

function Container(props) {
    const { isAuthenticated, authenticateUser, location, searchResults, onChange, onSearch, onPlayVideo, onReady, onPauseVideo, onResultClick, playing, selectedResult, tapeImages, builderImage, selectImage, tapeLabel, onLabelChange, onPassToSideA, sideA, onPassToSideB, sideB, displayImageSelector, onSaveImage, onSavePlaylist } = props;
   

    return (
            <section className="route-section">
                <Switch location={location}>
                    <Route exact path="/" component={Landing} />
                    
                    <Route path='/create-mixtapes'
                    render={(props) => isAuthenticated ? (<CreateMixtapes {...props} authenticateUser={authenticateUser} searchResults={searchResults} onReady={onReady} onSearch={onSearch} onChange={onChange} onPauseVideo={onPauseVideo} onPlayVideo={onPlayVideo} onResultClick={onResultClick} playing={playing} selectedResult={selectedResult} tapeImages={tapeImages} builderImage={builderImage} selectImage={selectImage} tapeLabel={tapeLabel} onLabelChange={onLabelChange} onPassToSideA={onPassToSideA} sideA={sideA} onPassToSideB={onPassToSideB} sideB={sideB} displayImageSelector={displayImageSelector} onSaveImage={onSaveImage} onSavePlaylist={onSavePlaylist} />) : (<Login {...props} />) } />

                    <Route path='/mixtape-player'
                    render={(props) => <MixtapePlayer {...props} />} />

                    <Route path='/login'
                    render={(props) => <Login {...props} />} />

                </Switch>
            </section>
    );
}

// <Route path="/create-mixtapes" component={CreateMixtapes} searchResults={searchResults} />

export default withRouter(Container);