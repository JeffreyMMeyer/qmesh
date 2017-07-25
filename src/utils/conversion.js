

const highwaterDecode = (indices) => {

    var arr = [];

    var highest = 0;
    for (var i = 0; i < indices.length; ++i) {
        var code = indices[i];
        arr.push(highest - code);
        if (code === 0) {
            ++highest;
        }
    }
    return arr;
}

const zigZagDecode = (value) => {
    return (value >> 1) ^ (-(value & 1));
}

const getUint32Array = (data, startPos, count) => {
    return new Uint32Array(data.slice(startPos, startPos + 4*count));
}
const getUint32 = (data, startPos) => {
    return getUint32Array(data, startPos, 1)[0];
}
const getUint16Array = (data, startPos, count) => {
    return new Uint16Array(data.slice(startPos, startPos + 2*count));
}
const getUint16 = (data, startPos) => {
    return getUint16Array(data, startPos, 1)[0];
}
const getFloat64Array = (data, startPos, count) => {
    return new Float64Array(data.slice(startPos, startPos + 8 * count));
}
const getFloat64 = (data, startPos) => {
    return getFloat64Array(data, startPos, 1)[0];       
}
const getFloat32Array = (data, startPos, count) => {
    return new Float32Array(data.slice(startPos, startPos + 4*count));
}
const getFloat32 = (data, startPos) => {
    return getFloat32Array(data, startPos, 1)[0];       
}

module.exports = {
    zigZagDecode : zigZagDecode,
    highwaterDecode : highwaterDecode,
    getUint32 : getUint32,
    getUint32Array : getUint32Array,
    getUint16 : getUint16,
    getUint16Array : getUint16Array,
    getFloat64 : getFloat64,
    getFloat64Array : getFloat64Array,
    getFloat32 : getFloat32,
    getFloat32Array : getFloat32Array
}


