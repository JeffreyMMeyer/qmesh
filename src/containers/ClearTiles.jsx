import { connect } from 'react-redux'
import { removeAllTiles } from '../actions'
import ClearAllTiles from '../components/ClearAllTiles.jsx'

const mapStateToProps = (state) => { 
    return ({
        tiles: state.tiles
    })
}

const mapDispatchToProps = {
    onRemoveAllTilesClick: removeAllTiles
}

const ClearTiles = connect( 
    mapStateToProps,
    mapDispatchToProps
)(ClearAllTiles)

export default ClearTiles