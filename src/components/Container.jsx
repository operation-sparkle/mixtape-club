import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Landing from "./Landing.jsx";
import Login from "./Login.jsx";
import CreateMixtapes from "./CreateMixtapes.jsx";
import MixtapePlayer from "./MixtapePlayer.jsx";

function Container(props) {
    const { location, searchResults, onChange, onSearch, onPlayVideo, onReady } = props;
    console.log(props);
    return (
            <section className="route-section">
                <Switch location={location}>
                    <Route exact path="/" component={Landing} />
                    <Route path="/login" component={Login} />
                    
                    <Route
                        path='/create-mixtapes'
                    render={(props) => <CreateMixtapes {...props} searchResults={searchResults} onReady={onReady} onSearch={onSearch} onChange={onChange} onPlayVideo={onPlayVideo}/>}
                    />
                    <Route path="/mixtape-player" component={MixtapePlayer} />
                </Switch>
            </section>
    );
}

// <Route path="/create-mixtapes" component={CreateMixtapes} searchResults={searchResults} />

export default withRouter(Container);