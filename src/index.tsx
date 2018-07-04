import React from "react";
import ReactDOM from "react-dom";
import axios, { AxiosResponse } from "axios";
import './index.css';
import { resolve } from "path";


type State = {
    path: string
    pattern: string
    data: any
    status: number
    statusText: string
    headers: any;
}

class App extends React.Component<{}, State> {

    constructor(props) {
        super(props);
        this.state = {
            path: "",
            pattern: "",
            data: {},
            headers: {},
            status: -1,
            statusText: ""
        }
        this.handlepathChange = this.handlepathChange.bind(this)
        this.handlepatternChange = this.handlepatternChange.bind(this)
    }

    handlepathChange = (e) => {
        this.setState({ path: e.target.value })
    }
    handlepatternChange = (e) => {
        this.setState({ pattern: e.target.value })
    }

    //คลิก
    onClick = (e) => {
        axios.post('http://localhost:5000/api/search/searchFile', {
            path: this.state.path,
            pattern: this.state.pattern,
        }).then((response) => {
            this.setState({
                statusText: response.statusText,
                status: response.status,
                headers: response.headers,
                data: response.data
            })
        }).catch((error) => {
            console.log("AXIOS ERROR: ", error)
        })
    }

    renderResult() {
        if (this.state.status != -1) {
            return (
                <div>
                    <h5>Status:</h5>
                    <pre>{this.state.status + ' ' + this.state.statusText}</pre>
                    <h5>Headers:</h5>
                    <pre>{JSON.stringify(this.state.headers, null, 4)}</pre>
                    <h5>Data:</h5>
                    <pre>{JSON.stringify(this.state.data, null, 4)}</pre>
                </div>
            )
        } else {
            return <div>Empty</div>
        }
    }

    render() {
        var divStyle = {
            color: 'black',
            backgroundColor: '#cccccc',
            padding: "20px",
            margin: "20px"
        };

        return (
            <div>
                <h1>Search File[TS ver.]</h1>
                <div>
                    <div className="text">
                        <label>Path :</label>
                        <input type="text" name="path" placeholder="Todo Path ..." onChange={this.handlepathChange}></input>
                    </div>

                    <div className="text">
                        <label>Pattern :</label>
                        <input type="text" name="pattern" placeholder="Todo Pattern ..." onChange={this.handlepatternChange}></input>
                    </div>

                    <button onClick={this.onClick} >Search</button>
                    <br /><br />
                    Result :

                    <div style={divStyle} id="postResult">
                        {this.renderResult()}
                    </div>
                </div>
            </div>
        )
    }
}

var root = document.getElementById("root")
ReactDOM.render(<App />, root)