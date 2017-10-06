import React from 'react';
import TileItem from '../components/TileItem.jsx' 

const TileList = ({ tiles, onRemoveTileClick }) => (<ul>
        {tiles.map(tile =>
        <TileItem
            key={tile.id}
            {...tile}
            onRemoveClick={() => onRemoveTileClick(tile.id)}
        />
        )}
    </ul>
    )
 
export default TileList