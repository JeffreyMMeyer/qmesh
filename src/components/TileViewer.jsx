import React, {Component} from 'react';
import 'three';
import 'three/OrbitControls';
import QTile from '../tiles/QuantizedMeshTile.js';

function getTileBounds(tx, ty, zoom) {
    //http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_numbers_to_lon..2Flat.
    var n = Math.pow(2, zoom);
    var lon_deg = tx / n * 360.0 -180.0;
    var lat_rad = Math.atan(Math.sinh(Math.PI * (1 - 2 * ty / n)));
    var lat_deg = lat_rad * 180.0 / Math.PI;
    return { lon: lon_deg, lat: lat_deg};
}

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
    
    animate() { 
        this.state.renderer.render(this.state.scene, this.state.camera);
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
        this.hasTileMesh = this.hasTileMesh.bind(this);

        this.state = {
            renderer : renderer,
            scene: scene,
            camera: camera,
            tileMeshes : {}
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

    appendTileMesh(qtile, tileKey, callback) {

        console.log(qtile.header.bytes);
        var geometry = new THREE.Geometry();
        geometry.vertices = qtile.vertices;
        geometry.faces = qtile.faces;        
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();

        console.log(tileKey);
        var xyz = tileKey.split("/");
        console.log(xyz);
        var bounds = getTileBounds(xyz[0], xyz[1], xyz[2]);
        if (xyz[1] == 6895) {
            geometry.translate( 0, -327,0 ); 
            if (xyz[0] == 8474) {
                geometry.translate(-327,0,0);
            } else if (xyz[0] == 8473) {
                geometry.translate(-(2*327),0,0);

            }
        } else if(xyz[0] == 8474) {
                geometry.translate(-327,0,0);
        } else if (xyz[0] == 8473) {
            geometry.translate(-(2*327),0,0);
            
        }
        console.log(bounds);
        //     geometry.translate( -327,0,0 ); 
        // }

        var material = new THREE.MeshLambertMaterial();
        var mesh = new THREE.Mesh(geometry, material);

        this.state.scene.add(mesh);
        callback(mesh.id);

    }

    addTileMeshReference(tilesetKey, tileKey, threeId) {
        let tMeshes = this.state.tileMeshes;
        if (!tMeshes.hasOwnProperty(tilesetKey)) {
            tMeshes[tilesetKey] = {}
        }
        if (!tMeshes[tilesetKey].hasOwnProperty(tileKey)) {
            tMeshes[tilesetKey][tileKey] = threeId;
        }
    }


    hasTileMesh(tilesetKey, tileKey) {

        let tMeshes = this.state.tileMeshes;
        if (tMeshes.hasOwnProperty(tilesetKey)) {
            if (tMeshes[tilesetKey][tileKey]) {
                return true;
            }
        }
        return false;
    }

    componentDidUpdate() {

        var tiles = this.props.tiles;

        for (var tilesetKey in tiles) {
            let tileSet = tiles[tilesetKey];

            for (var coordKey in tileSet) {

                if (!this.hasTileMesh(tilesetKey, coordKey)) {
                    this.appendTileMesh(tileSet[coordKey], coordKey, (threeId) => {
                        this.addTileMeshReference(tilesetKey, coordKey, threeId);                        
                    });
                }

            }
        }


    }


    render() {
        return (
            <div style={{ marginLeft: '350px', width: this.props.width, height: this.props.height}} ref="threeview"></div>
        );
    }
}

