import React from 'react'
import AddTile from '../containers/AddTile.jsx' 
import ClearTiles from '../containers/ClearTiles.jsx'
import EditableTileList from '../containers/EditableTileList.jsx'
import TileViewer from './TileViewer.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const App = () =>  { 

    return (
        <MuiThemeProvider>            
            <div>
                <h1>Qmesh</h1>
                <AddTile />
                <ClearTiles />
                <TileViewer />
                <EditableTileList/>
            </div>
        </MuiThemeProvider>
        ) 
}

export default App