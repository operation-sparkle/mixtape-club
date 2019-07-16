import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <h1>Mixtape Club</h1>
                <h2>It lives!!!</h2>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));