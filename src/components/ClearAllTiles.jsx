import React from 'react'

const ClearAllTiles = ({ onRemoveAllTilesClick }) => {

    return (    
        <div onClick={onRemoveAllTilesClick}>
            Clear all tiles!
        </div>
    )
}

export default ClearAllTiles