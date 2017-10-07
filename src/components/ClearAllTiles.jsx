import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const style = {
  margin: 12,
}

const ClearAllTiles = ({ onRemoveAllTilesClick }) => {

    return (    
    <RaisedButton 
        label="Clear tiles" 
        secondary={true} 
        onClick={onRemoveAllTilesClick}
        style={style} />
    )
}

export default ClearAllTiles