import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import './index.css';


type State = {
    path: string
    pattern: string
}

class App extends React.Component<{}, State> {
    constructor(props) {
        super(props);
        this.state = {
            path: "",
            pattern: ""
        }

        this.handlepathChange = this.handlepathChange.bind(this)
        this.handlepatternChange = this.handlepatternChange.bind(this)
    }

    handlepathChange (evt) {

        this.setState({ path: evt.target.value })
      }
      
      handlepatternChange (evt) {
        
        this.setState({ pattern: evt.target.value })
      }
    
    



    onClick = (e) => {
        console.log(this.state)
        let resultElement = document.getElementById('postResult')
        resultElement.innerHTML = ''
 
        axios.post('http://localhost:5002/api/search/searchFile', {
        path: this.state.path, 
        pattern: this.state.pattern,
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
      
      }
    
      })
      .then((response) => {
        console.log(response.data)
        resultElement.innerHTML = generateSuccessHTMLOutput(response)
    })
    .catch((error) => {
        console.log("AXIOS ERROR: ", error)
    })


    function generateSuccessHTMLOutput(response) {
        return  '<h5>Status:</h5>' +
                '<pre>' + response.status + ' ' + response.statusText + '</pre>' +
                '<h5>Headers:</h5>' +
                '<pre>' + JSON.stringify(response.headers, null, '\t') + '</pre>' +
                '<h5>Data:</h5>' +
                '<pre>' + JSON.stringify(response.data, null, '\t') + '</pre>'
      }
        
    
    }

    render()  
    {
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
                    <label>Path :   </label>
                    <input type="text" name="path" placeholder="Todo Path ..." onChange={this.handlepathChange}></input>
                </div>

                <div className="text">
                    <label>Pattern :    </label>
                    <input type="text" name="pattern"  placeholder="Todo Pattern ..." onChange={this.handlepatternChange}></input>
                
                </div>

                    <button onClick={this.onClick} >Search</button>
                    <br /><br />
                    Result :
                    <div style={divStyle} id="postResult"></div>


                </div>   
            </div>       
           
        )
    }
}

var root = document.getElementById("root")
ReactDOM.render(<App />, root)