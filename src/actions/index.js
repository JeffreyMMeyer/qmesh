


const url = "http://assets.agi.com/stk-terrain/world";
const getTileId = (x,y,z) => { return "tile-"+x+"/"+y+"/"+z; }
const getTileUrl = (x,y,z) => { return url + "/"+x+"/"+y+"/"+z+ ".terrain?v=1.16389.0" }

export const addTile = (x, y, z) => {
 return {
    type: 'ADD_TILE',
    tile: {
        name: getTileId(x,y,z),
        id: getTileUrl(x,y,z),
        url: getTileUrl(x,y,z),
        x,
        y,
        z 
    }
 }
}

  
export const removeAllTiles = () => {
 return {
    type: 'CLEAR_ALL'
 }
}


export const removeTile = (id) => {
 return {
    type: 'REMOVE_TILE',
    id
 }
}