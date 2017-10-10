import { connect } from 'react-redux'
import TileViewer from '../components/TileViewer.jsx'
import {removeTile} from '../actions'

const mapStateToProps = (state) => { 
    return state.tiles
}



const ThreeTileViewController = connect(
  mapStateToProps
)(TileViewer)


export default ThreeTileViewController


