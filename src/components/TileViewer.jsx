import React, {Component} from 'react';
import 'three';
import 'three/OrbitControls';
import QTile from '../tiles/QuantiziedMeshTile.js';


export default class TileViewer extends Component {

    setupRender(width, height) {
        let renderer = new THREE.WebGLRenderer();               /*  Rendererererers particles.  */
        renderer.setPixelRatio(window.devicePixelRatio);    /*  Probably 1; unless you're fancy.    */
        renderer.setSize(width, height);                    /*  Full screen baby Wooooo!    */
        renderer.setClearColor(0x000000, 0);
        return renderer;
    }

    animate() { 
        this.state.renderer.render(this.state.scene, this.state.camera);
    }
    

    constructor(props) {
        super(props);

        var fieldOfView = 45;
        var height = this.props.height;
        var width = this.props.width;
        var aspectRatio = width/height;
        var nearPlane = 1;
        var farPlane = 10000;

        var renderer = new THREE.WebGLRenderer();               /*  Rendererererers particles.  */
        renderer.setPixelRatio(window.devicePixelRatio);    /*  Probably 1; unless you're fancy.    */
        renderer.setSize(width, height);                    /*  Full screen baby Wooooo!    */
        renderer.setClearColor(0x454545, 0);
        // var renderer = this.setupRender(400,1200);

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.z = 2000;
        camera.position.x=-300;
        camera.position.y=-300;

        this.animate = this.animate.bind(this);

        this.state = {
            renderer : renderer,
            scene: scene,
            camera: camera
        }
    }
    
    componentDidMount() {
        this.refs.threeview.append(this.state.renderer.domElement);
        var ambientLight = new THREE.AmbientLight(0x343434);
        this.state.scene.add(ambientLight);

        var spotLight = new THREE.SpotLight(0xafaffa);
        spotLight.position.set(500, 20, 500);
        spotLight.castShadow = true;
        this.state.scene.add(spotLight);


        var controls = new THREE.OrbitControls( this.state.camera, this.state.renderer.domElement );
            controls.addEventListener( 'change', this.animate );
            

        requestAnimationFrame(this.animate);

    }

    componentDidUpdate() {

        var tiles = this.props.tiles;
        console.log(tiles);
        console.log("DRAW TILES")
        // var geometry = new THREE.Geometry();
        // geometry.vertices = qtile.vertices;
        // geometry.faces = qtile.faces;        
        // geometry.computeFaceNormals();
        // geometry.computeVertexNormals();

        // var material = new THREE.MeshLambertMaterial();

        // var mesh = new THREE.Mesh(geometry, material);
        // console.log(this.state.scene);
        // this.state.scene.add(mesh);
    }

    render() {
        return (
            <div style={{width: 600, height: 500}} ref="threeview"></div>
        );
    }
}