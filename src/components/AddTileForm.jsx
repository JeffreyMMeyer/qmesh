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
            let vals = input.value.split('/');
            if (vals.length !== 3) {
                return
            }
            dispatch(addTile(vals[0], vals[1], vals[2]))
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