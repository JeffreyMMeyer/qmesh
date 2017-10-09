import { connect } from 'react-redux'
import TileList from '../components/TileList.jsx'
import {removeTile} from '../actions'

const mapStateToProps = (state) => {  
    return state.tiles
}

const mapDispatchToProps = {
    onRemoveTileClick: removeTile
}

const EditableTileList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TileList)


export default EditableTileList
