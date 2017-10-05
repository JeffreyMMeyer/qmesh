import React from 'react'
import { connect } from 'react-redux'
import { addTile } from '../actions'

let AddTileForm = ({ dispatch }) =>  {

    let input;
    
    return (<div>
        <form onSubmit={e => {
            e.preventDefault()
            if (!input.value.trim()) {
                return
            }
            dispatch(addTile(1,2,3))
            input.value = ''
        }}>
            <input ref={node => {
                input = node
            }} />
            <button type="submit">Add Tile</button>
        </form>
    </div>)

}

AddTileForm = connect()(AddTileForm)

export default AddTileForm