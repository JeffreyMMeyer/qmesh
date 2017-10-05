import { combineReducers } from 'redux'  

const tile = (state, action) => {
  switch (action.type) {
     case "ADD_TILE":
        return [...state, { id: action.id, x: action.x, y: action.y, z: action.z}]
 
     case "CLEAR_ALL":
        return []
 
      case "REMOVE_TILE": 
        let index = state.findIndex((x) => x.id === n); 
        return [
            ...list.slice(0, index),
            ...list.slice(index + 1)
        ]
        
     default:
      return  state ? state : []
    } 
}

const tileApp = combineReducers({
  tile
})

export default tileApp