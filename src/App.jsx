import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <h1> It's alive! </h1>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));