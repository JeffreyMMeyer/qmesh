import axios from 'axios'
import QTileReader from '../tiles/QuantiziedMeshTileReader.js'

const url = "http://assets.agi.com/stk-terrain/world";
const getTileId = (tile) => { return "tile-"+tile.x+"/"+tile.y+"/"+tile.z; }
const getTileUrl = (tile) => { return url + "/"+tile.x+"/"+tile.y+"/"+tile.z+ ".terrain?v=1.16389.0" }

function getTileRequest(url) {
    return new Promise((resolve, reject) => {

        var xhr = new XMLHttpRequest();
        
        xhr.onload = function(e) {
            if (xhr.status === 200) {
                resolve({
                    url : url,
                    status: this.status,
                    data: this.response});
            }
            reject();            
        }
        xhr.timeout = 5000;
        xhr.ontimeout = (e) => reject
        xhr.open('GET', url, true);
        xhr.responseType = "arraybuffer";
        xhr.send();
    })
}




const tilesMiddleware = (store) => (next) => (action) => {

    switch (action.type) {

        case "ADD_TILE":  
            console.log(getTileUrl(action.tile))
            store.dispatch({
                type: "FETCH_TILE",
                payload: getTileRequest(getTileUrl(action.tile))
            })
            
            
        break;

        case "FETCH_TILE_FULFILLED":
            console.log(action);
            if (action.payload.status === 200) {  
                console.log(action.data)
                var tileData = QTileReader.parseTile(action.payload.data)
                
                store.dispatch({
                    type: "ADD_PARSED", 
                    data: tileData,
                    url: action.payload.url
                })
            } else {
                store.dispatch({
                    type: "BIG_FUCKUP",
                    message: "Status: " + action.payload.status
                })
            }
        break;

    } 
  next(action);
}

export default tilesMiddleware