import axios from 'axios'
import QTileReader from '../tiles/QuantiziedMeshTileReader.js'

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
            store.dispatch({
                type: "FETCH_TILE",
                payload: getTileRequest(action.tile.url)
            })
        break;

        case "FETCH_TILE_FULFILLED":
            if (action.payload.status === 200) {

                var tileData = QTileReader.parseTile(action.payload.data)
                
                store.dispatch({
                    type: "TILE_PARSED", 
                    payload: {
                        data: tileData,
                        url: action.payload.url
                    }
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