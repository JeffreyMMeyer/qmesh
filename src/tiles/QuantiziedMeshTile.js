import * as THREE from 'three';

export default class QuantizedMeshTile {

    constructor(header, uArray, vArray, heightArray, indexArray) {  
        this.header = header;  
        this.vertices = this.getVertices(uArray, vArray, heightArray, indexArray);
        this.faces = this.getFaces(uArray, vArray, heightArray, indexArray); 
    }

    getVertices(uArray, vArray, heightArray, indexArray) {
        var vertices = [];
        for (var i = 0; i < uArray.length; i++) {
            vertices.push(new THREE.Vector3(uArray[i]/100, vArray[i]/100, heightArray[i]/200));
        }
        return vertices;
    }
    
    getFaces(uArray, vArray, heightArray, indexArray) {
        var faces = [];
        for (var i = 0; i < indexArray.length; i+=3) {
            faces.push(new THREE.Face3(indexArray[i], indexArray[i+1], indexArray[i+2]));               
        }
        return faces;
    }
}