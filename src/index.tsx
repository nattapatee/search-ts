import React from "react";
import ReactDOM from "react-dom";


type State = {
    path: string
    pattern: string
}

class App extends React.Component<{}, State> {
    constructor(props) {
        super(props);
        this.state = {
            path: "/Users/wk",
            pattern: "*.json"
        }
    }

    onClick = (e) => {
        console.log("Hello, world!");
    }

    render() {
        return (
            <h1 onClick={this.onClick}>Hello, world!</h1>
        )
    }
}

var root = document.getElementById("root")
ReactDOM.render(<App />, root);