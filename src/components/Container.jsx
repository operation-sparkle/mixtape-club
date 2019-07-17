import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Landing from "./Landing.jsx";
import Login from "./Login.jsx";
import CreateMixtapes from "./CreateMixtapes.jsx";
import MixtapePlayer from "./MixtapePlayer.jsx";

function Container({ location }) {
    return (
            <section className="route-section">
                <Switch location={location}>
                    <Route exact path="/" component={Landing} />
                    <Route path="/login" component={Login} />
                    <Route path="/create-mixtapes" component={CreateMixtapes} />
                    <Route path="/mixtape-player" component={MixtapePlayer} />
                </Switch>
            </section>
    );
}

export default withRouter(Container);