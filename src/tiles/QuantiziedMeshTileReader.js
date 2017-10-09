import c from './Conversion';
import cnst from './Constants';
import ThreeQuantizedMeshTile from './QuantiziedMeshTile';

const parseTile = (data) => {

    let byteCount = 0; 
    
    let header = getHeader(data, byteCount);
    byteCount += 88;
    
    var vertexCount = c.getUint32(data, byteCount);
    byteCount += cnst.UINT32_BYTE_SIZE;

    var uArray = c.getUint16Array(data, byteCount, vertexCount);
    byteCount += vertexCount * cnst.UINT16_BYTE_SIZE;

    var vArray = c.getUint16Array(data, byteCount, vertexCount);
    byteCount += vertexCount * cnst.UINT16_BYTE_SIZE;

    var heightArray = c.getUint16Array(data, byteCount, vertexCount);
    byteCount += vertexCount * cnst.UINT16_BYTE_SIZE;

    var i;
    var u = 0;
    var v = 0;
    var height = 0;

    for (i = 0; i < uArray.length; ++i) {
        u += c.zigZagDecode(uArray[i]);
        v += c.zigZagDecode(vArray[i]);
        height += c.zigZagDecode(heightArray[i]);

        uArray[i] = u;
        vArray[i] = v;
        heightArray[i] = height;
    }
    
    if (byteCount % 2 !== 0) {
        byteCount += (2 - (byteCount % 2));
    }


    var triangleCount = c.getUint32(data, byteCount);
    byteCount += cnst.UINT32_BYTE_SIZE;

    var indices = c.getUint16Array(data, byteCount, triangleCount * 3);
    byteCount += triangleCount * 3 * 2;

    let indexArray = c.highwaterDecode(indices); 
    return new ThreeQuantizedMeshTile(header, uArray, vArray, heightArray, indexArray);
}

const getHeader = (data, byteCount) => {

    return {
        bytes: data.byteLength,
        centerX : c.getFloat64(data, byteCount),
        centerY : c.getFloat64(data, byteCount + 8),  
        centerZ : c.getFloat64(data, byteCount + 16),
        minimumHeight : c.getFloat32(data, byteCount + 24),
        maximumHeight : c.getFloat32(data, byteCount + 28),
        boundingSphereCenterX : c.getFloat64(data, byteCount + 32),
        boundingSphereCenterY : c.getFloat64(data, byteCount + 40),
        boundingSphereCenterZ : c.getFloat64(data, byteCount + 48),
        boundingSphereRadius : c.getFloat64(data, byteCount + 56),
        horizonOcclusionPointX : c.getFloat64(data, byteCount + 64),
        horizonOcclusionPointY : c.getFloat64(data, byteCount + 72),
        horizonOcclusionPointZ : c.getFloat64(data, byteCount + 80)
    }
}

module.exports = {
    parseTile : parseTile
}