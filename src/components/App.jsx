import React from 'react'
import AddTile from '../containers/AddTile.jsx' 
import ClearTiles from '../containers/ClearTiles.jsx'
import EditableTileList from '../containers/EditableTileList.jsx'
import TileViewer from './TileViewer.jsx'
import ThreeTileViewController from '../containers/ThreeTileViewController.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import AppBar from 'material-ui/AppBar';

const QmeshAppBar = () => (
  <AppBar
    title="Qmesh"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
);

const App = () =>  { 

    return (
        <MuiThemeProvider>            
            <div style={{margin: 0}}>
                <QmeshAppBar />
                <div style={{
                        float: "left", 
                        width: "20%",
                        padding: "0 1em"
                    }}>
                    <AddTile />
                    <ClearTiles />
                </div>
                
                <div style={{
                    margin:0,
                    float: "left",
                    marginLeft: "0",
                    width: "50%",
                    padding: "0 1em"
                 }}>
                    <ThreeTileViewController />
                </div>
                
                <div style={{
                    float: "right",
                    width: "25%",
                    clear: "none"}}>
                    <EditableTileList/>
                </div>
            </div>
        </MuiThemeProvider>
        ) 
}

export default App