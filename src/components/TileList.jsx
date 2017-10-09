import React from 'react';
import TileItem from '../components/TileItem.jsx' 
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

const TileList = ({ tiles, onRemoveTileClick }) => {
    console.log(tiles);
    return (
    
    
    <List>
        {tiles.map(tile => 
            <ListItem 
            key={tile.id}
            primaryText={tile.id}            
            />)
        }
    </List>)
}
    
 
export default TileList