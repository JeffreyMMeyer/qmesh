import { combineReducers } from 'redux'  

const tiles = (state, action) => {
  switch (action.type) {
      case "ADD_TILE":      
        return [...state, { id: action.id, x: action.x, y: action.y, z: action.z, isFetching: true}]
      
      case "FETCH_TILE":
        var index = state.findIndex((x) => x.id === action.id)        
        return state;

      case "CLEAR_ALL":
        return []
      
      case "REMOVE_TILE": 
        var index = state.findIndex((x) => x.id === action.id);  
        return [
            ...state.slice(0, index),
            ...state.slice(index + 1)
        ]
        
     default:
      return  state ? state : []
    }
}

const tileApp = combineReducers({
  tiles
})

export default tileApp