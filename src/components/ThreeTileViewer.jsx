import React, {Component} from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';
import QTile from '../tiles/QuantizedMeshTile.jsx';

class Tile extends Component {

    constructor(props) {
        super(props); 
        console.log(this.props, "props");
    }

    render() {
        return (
        <mesh
          rotation={this.props.cubeRotation}
        >
          <geometry
            vertices={this.props.qtile.vertices}
            faces={this.props.qtile.faces}
          />
 
          <meshLambertMaterial  
          />
        </mesh>
        )      
    }

}

export default class TileViewer extends Component {


  constructor(props, context) {
    super(props, context);

    this.cameraPosition = new THREE.Vector3(0, 0, 522);

    this.state = {
        fieldOfView: 75,
        cubeRotation: new THREE.Euler(),
        cameraPosition: new THREE.Vector3(0,0,5),
        height: 900,
        width: 1500
    };

    this._onAnimate = () => {
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x + 0.001,
          this.state.cubeRotation.y + 0.001,
          0
        ),
      });
    };
  }

  render() {

    return (<React3
      mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
      width={this.state.width}
      height={this.state.height}
      onAnimate={this._onAnimate}
    >
      <scene>
        <perspectiveCamera
          name="camera"
          fov={this.state.fieldOfView}
          aspect={this.state.width / this.state.height}
          near={0.1}
          far={1000}

          position={this.cameraPosition}
        />
        <ambientLight 
            color={0x343434}
        />
        <spotLight
            color={0xafaffa}
            position={new THREE.Vector3(500, 20, 500)}
            castShadow={true}
        /> 
        <Tile cubeRotation={this.state.cubeRotation} qtile={this.props.qtile}/>
      </scene>
    </React3>);
  }
}

