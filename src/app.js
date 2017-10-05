// import ThreeTileViewer from './components/ThreeTileViewer.jsx';
import TileViewer from './components/TileViewer.jsx';
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import QMTileReader from './readers/QuantiziedMeshTileReader.js';
import LeftPane from './components/LeftPane.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'; 

injectTapEventPlugin();

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
            tiles : {},
            bbox : null,
            x: null,
            y: null,
            z: null, 
            qtile: null,
            tempCoordinates: {
                x : null,
                y : null,
                z : null
            }
        };
        this.setCoordinate = this.setCoordinate.bind(this);
        this.buildUrl = this.buildUrl.bind(this);

    }       

    buildUrl(baseUrl, x,y,z) {        
        return baseUrl + "/" + z + "/" + x + "/" + y + ".terrain?v=1.16389.0"; ///8498/6900.terrain?v=1.16389.0";
    }

    componentDidMount() {
        let cb = function(data) {
            console.log(data);
            console.log("loaded");
        }


        // 14/16950/13793
        // this.loadTile(14,16959,13790, cb)
        // this.loadTile(8497,6900,13, cb)
        // this.loadTile(8498,6901,13, cb)
        // this.loadTile(14,8477,11768, cb);
        this.loadTile(13,8475,6895, cb);
        this.loadTile(13,8474,6896, cb);
        this.loadTile(13,8474,6895, cb);
        this.loadTile(13,8473,6896, cb);
        this.loadTile(13,8473,6895, cb);
    }

    loadForBboxZoom(bbox, zoom) {
        
    }

    loadTile(z, x,y, cb) {
        var baseUrl = "http://assets.agi.com/stk-terrain/world"
        var context = this;
        getRequest(this.buildUrl(baseUrl, x,y,z), function(data) {
            var tile = QMTileReader.parseTile(data); 
            var tiles = context.state.tiles;

            let key = x + "/" + y + "/" + z;

            if (!tiles[baseUrl]) {
                tiles[baseUrl] = {}
            }
            tiles[baseUrl][key] = tile;
            console.log("tiles")
            context.setState({tiles: tiles});
            if (cb) {
                cb(tile); 
            }
        });
    }

    setCoordinate(coordinate, value) {
        var coords = this.state.tempCoordinates 
        coords[coordinate] = value;

        this.setState({
            tempCoordinates : coords
        }, function() {
            let coord = this.state.tempCoordinates;
            if (coord.x && coord.y && coord.z) {
                this.loadTile(coord.x, coord.y, coord.z);
            }
        }
        );
    }

    render() {

        return (
            <div>
                <Header/> 
                <LeftPane setCoordinate={this.setCoordinate}/>
                <TileViewer tiles={this.state.tiles} qtile={this.state.qtile} height={500} width={800}/>
            </div>
        ); 
    }
}




ReactDOM.render(

  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);



