import React from 'react'
import AddTile from '../containers/AddTile.jsx' 
import ClearTiles from '../containers/ClearTiles.jsx'
import EditableTileList from '../containers/EditableTileList.jsx'
import TileViewer from './TileViewer.jsx'

const App = () =>  { 

    return (
            <div>
                <h1>Qmesh</h1>
                <AddTile />
                <ClearTiles />
                <TileViewer />
                <EditableTileList/>
            </div>
        ) 
}

export default App