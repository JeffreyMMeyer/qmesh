// import ThreeTileViewer from './components/ThreeTileViewer.jsx';
import TileViewer from './components/TileViewer.jsx';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import QMTileReader from './readers/QuantiziedMeshTileReader.js';
import LeftPane from './components/LeftPane.jsx';

const url = "http://assets.agi.com/stk-terrain/world/13/8498/6900.terrain?v=1.16389.0";

function getRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function(e) {
        callback(this.response);
        // console.log(this.response, this.response.byteLength);
        // handleTileResponse(this.response);
    }
    // xhr.open('GET', '../3452.terrain', true);
    xhr.open('GET', url, true);
    xhr.send(null);
    xhr.responseType = "arraybuffer";
}

class Header extends Component {
    render() {
        return (<h1>Vector tiles</h1>)
    }
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            qtiles : [],
            bbox : null,
            x: null,
            y: null,
            z: null, 
            qtile: null
        };


    }       

    componentDidMount() {

        var context = this;
        getRequest(url, function(data) {
            var tile = QMTileReader.parseTile(data); 
            context.setState({qtile : tile});
        });
    }



    render() {
        // if (this.state.qtile) {
        //     console.log("rn")
            return (
                <div>
                    <Header/> 
                    <LeftPane />
                    <TileViewer qtile={this.state.qtile} height={600} width={800}/>

                </div>);
        // }
        // else {
        //     return (<div>Loading...</div>);
        // }
    }
}

function handleTileResponse(data) {

}



ReactDOM.render(
    <App />,
  document.getElementById('root')
);



