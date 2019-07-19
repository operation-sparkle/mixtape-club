import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Landing from "./Landing.jsx";
import Login from "./Login.jsx";
import CreateMixtapes from "./CreateMixtapes.jsx";
import MixtapePlayer from "./MixtapePlayer.jsx";

function Container(props) {
    const { location, searchResults, onChange, onSearch, onPlayVideo, onReady, onPauseVideo, onResultClick, playing, selectedResult, tapeImages, builderImage, selectImage, tapeLabel, onLabelChange, onPassToSideA, sideA, onPassToSideB, sideB } = props;
   
   
    return (
            <section className="route-section">
                <Switch location={location}>
                    <Route exact path="/" component={Landing} />
                    
                    <Route path='/create-mixtapes'
                    render={(props) => <CreateMixtapes {...props} searchResults={searchResults} onReady={onReady} onSearch={onSearch} onChange={onChange} onPauseVideo={onPauseVideo} onPlayVideo={onPlayVideo} onResultClick={onResultClick} playing={playing} selectedResult={selectedResult} tapeImages={tapeImages} builderImage={builderImage} selectImage={selectImage} tapeLabel={tapeLabel} onLabelChange={onLabelChange} onPassToSideA={onPassToSideA} sideA={sideA} onPassToSideB={onPassToSideB} sideB={sideB}  />} />

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