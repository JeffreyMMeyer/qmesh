import React, {Component} from 'react';
import 'three';
import 'three/OrbitControls';
import QTile from '../tiles/QuantizedMeshTile.jsx';


export default class TileViewer extends Component {

    setupRender(width, height) {
        let renderer = new THREE.WebGLRenderer();               /*  Rendererererers particles.  */
        renderer.setPixelRatio(window.devicePixelRatio);    /*  Probably 1; unless you're fancy.    */
        renderer.setSize(width, height);                    /*  Full screen baby Wooooo!    */
        renderer.setClearColor(0xffffff, 0);
        return renderer;
    }

    setupCamera(fieldOfView, aspectRatio, nearPlane, farPlane) {
        // return new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    }

    // setupScene() {

    // }

    animate() { 
        // this.state.camera.lookAt(this.state.scene.position);
        this.state.renderer.render(this.state.scene, this.state.camera);

        // this.state.controls.update();
    }
    

    constructor(props, context) {
        super(props, context);
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

    // // construct the position vector here, because if we use 'new' within render,
    // // React will think that things have changed when they have not.
    // this.cameraPosition = new THREE.Vector3(0, 0, 522);

    // this.state = {
    //     fieldOfView: 75,
    //     cubeRotation: new THREE.Euler(),
    //     cameraPosition: new THREE.Vector3(0,0,5),
    //     height: 900,
    //     width: 1500
    // };

    // this._onAnimate = () => {
    //   // we will get this callback every frame

    //   // pretend cubeRotation is immutable.
    //   // this helps with updates and pure rendering.
    //   // React will be sure that the rotation has now updated.
    //   this.setState({
    //     cubeRotation: new THREE.Euler(
    //       this.state.cubeRotation.x + 0.001,
    //       this.state.cubeRotation.y + 0.001,
    //       0
    //     ),
    //   });
    // };
  // }

    // render() {
    //     this.state.camera.lookAt(scene.position);
    //     this.state.renderer.render(scene, camera);     
    // }



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
        // controls.addEventListener( 'change', this.state.render ); // remove when using animation loop
        // this.setState({
        //     controls: controls
        // });
        // enable animation loop when using damping or autorotation
        //controls.enableDamping = true;
        //controls.dampingFactor = 0.25;
        // controls.enableZoom = false;

        requestAnimationFrame(this.animate);

    }

    componentDidUpdate() {

        var qtile = this.props.qtile;
        console.log(qtile);
        var geometry = new THREE.Geometry();
        geometry.vertices = qtile.vertices;
        geometry.faces = qtile.faces;        
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();


        var material = new THREE.MeshLambertMaterial();

        var mesh = new THREE.Mesh(geometry, material);
        console.log(this.state.scene);
        this.state.scene.add(mesh);
    }


    render() {
        return (
            <div style={{width: this.props.width, height: this.props.height}} ref="threeview"></div>
        );
    }
}

