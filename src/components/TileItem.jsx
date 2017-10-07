import React from 'react' 

const TileItem = ({ onRemoveClick, id }) => (
  <li>
    Tile : {id}
    <div onClick={onRemoveClick}>x</div>
  </li>
)


export default TileItem

