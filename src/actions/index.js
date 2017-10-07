
const getTileId = (x,y,z) => { return "tile"+x+"."+y+"."+z; }

export const addTile = (x, y, z) => {
 return {
    type: 'ADD_TILE',
    id: getTileId(x,y,z),
    x,
    y,
    z
 }
}

export const fetchTile = (x, y, z) => {
    return {
        type: 'FETCH_TILE',
        id: getTileId(x,y,z),
        x,
        y,
        z
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