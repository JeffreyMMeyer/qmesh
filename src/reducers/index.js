import { combineReducers  } from 'redux'  
import 'three';

const initialState = {
  tiles : [],
  render: {
    height: 500,
    width: 600
  },
  scene : new THREE.Scene(),
  promises: {}
}

const tiles = (state, action) => {
  switch (action.type) {

      case "BIG_FUCKUP":
        console.log("big fuckup", action.message);
        return state;
      
      case "ADD_TILE":
        return {
            ...state,
            tiles: [...state.tiles, action.tile]
        } 
      case "CLEAR_ALL":
        return {
          ...state,
          tiles: []
        }
        
      case "TILE_PARSED":
      
        var index = state.tiles.findIndex((x) => x.url === action.payload.url)
        if (index >-1) {
          state.tiles[index].data = action.payload.data;
        }        
        return state; 

      // case "ADD_THREE_TILE":
      //   state.scene.add()
      //   return state;
      
      case "REMOVE_TILE": 
        var index = state.tiles.findIndex((x) => x.id === action.id) 
        return {
            ...state,
            tiles: [
              ...state.tiles.slice(0, index),
              ...state.tiles.slice(index + 1)
            ]
        } 

     default:
      return  state ? state : initialState
    }
}

const tileApp = combineReducers({
  tiles
})

export default tileApp