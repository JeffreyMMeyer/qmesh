import { connect } from 'react-redux'
import TileList from '../components/TileList.jsx'
import {removeTile} from '../actions'

const mapStateToProps = (state) => { 
    return ({
        tiles: state.tiles
    })
}



const mapDispatchToProps = {
  onRemoveTileClick:  removeTile
}

const onRemoveTile = (tile) => {
    console.log(tile);
}


const EditableTileList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TileList)
 

export default EditableTileList
