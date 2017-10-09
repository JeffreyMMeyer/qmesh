import React from 'react'
import { connect } from 'react-redux'
import { addTile } from '../actions'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'

const style = {
  margin: 12,
};

let AddTile = ({ dispatch }) =>  {

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
        
        <RaisedButton  type="submit" label="Add tile" primary={true} style={style} />
        </form>
    </div>)
}

AddTile = connect()(AddTile)

export default AddTile