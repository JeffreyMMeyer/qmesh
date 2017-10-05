import React, {Component} from 'react';
import TextField from 'material-ui/TextField';


const style = {
    top: '100px',
    zIndex: 100,
    width: '15%',
    position: 'absolute',
    height: '100%'
}

export default class LeftPane extends Component {

    constructor(props) {
        super(props);
    }

    onCoordinateChange(newValue, coordinate) {
        // console.log(event, coordinate);

        this.props.setCoordinate(coordinate, newValue);
    }

    isValid(x, y, z) {
        return true;
    }

    render() {
        return (
            <div style={style}>

                <TextField
                    onChange={(event, newValue) => this.onCoordinateChange(newValue, 'x')}
                  hintText="Enter x value"
                  floatingLabelText="X"
                /><br />
                <TextField
                    onChange={(event, newValue) => this.onCoordinateChange(newValue, 'y')}
                  hintText="Enter y value"
                  floatingLabelText="Y"
                /><br />
                <TextField
                    onChange={(event, newValue) => this.onCoordinateChange(newValue, 'z')}
                  hintText="Enter zoom value"
                  floatingLabelText="Z"
                /><br /> 
            </div>
            )
    }

}