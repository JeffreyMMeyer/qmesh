var qmesh = qmesh || {};


(function(ns) {

	ns.TileReader = function() {

		var UINT16_BYTE_SIZE = 2;
		var UINT32_BYTE_SIZE = 4;
		var FLOAT64_BYTE_SIZE = 8;
		var FLOAT32_BYTE_SIZE = 4;

		var xtile = 2762;
		var ytile = 1566;
		var zoom = 12;

		var nw = getTileBounds(xtile, ytile, zoom);
		var se = getTileBounds(xtile+1, ytile+1, zoom);


		function readTileFromUrl(url) {
			var tms = url.match('/(\d+/\d+/\d+)/');
			var tmsArray = tms.split('/');
			return tms;
		}
    
        function zigZagDecode(value) {
            return (value >> 1) ^ (-(value & 1));
        }
	
	 	function parseTile(data, x, y, z) {
			var byteCount = 0;
			var length = data.byteLength;

			var qtile = {};
	 		
	 		var header = getHeader(data, byteCount);
			byteCount += 88;
	        $('#tile-header-content').append($(headerTemplate(header)));

			var vertexCount = getUint32(data, byteCount);
			byteCount += UINT32_BYTE_SIZE;

			var uArray = getUint16Array(data, byteCount, vertexCount);
			byteCount += vertexCount * UINT16_BYTE_SIZE;

			var vArray = getUint16Array(data, byteCount, vertexCount);
			byteCount += vertexCount * UINT16_BYTE_SIZE;

			var heightArray = getUint16Array(data, byteCount, vertexCount);
			byteCount += vertexCount * UINT16_BYTE_SIZE;

	        var i;
	        var u = 0;
	        var v = 0;
	        var height = 0;

	        for (i = 0; i < uArray.length; ++i) {
	            u += zigZagDecode(uArray[i]);
	            v += zigZagDecode(vArray[i]);
	            height += zigZagDecode(heightArray[i]);

	            uArray[i] = u;
	            vArray[i] = v;
	            heightArray[i] = height;
	        }
	 		if (byteCount % 2 !== 0) {
	            byteCount += (2 - (byteCount % 2));
	        }


	        var triangleCount = getUint32(data, byteCount);
	        byteCount += UINT32_BYTE_SIZE;

			var indices = getUint16Array(data, byteCount, triangleCount * 3);
			byteCount += triangleCount * 3 * 2;

			indices = highwaterDecode(indices);

	        
	        var westVertexCount = getUint32(data,byteCount);
	        byteCount += UINT32_BYTE_SIZE;
	        var westIndices = getUint16Array(data,byteCount,westVertexCount);
	        byteCount += UINT16_BYTE_SIZE * westVertexCount;

			// westIndices = highwaterDecode(westIndices);


			var southVertexCount= getUint32(data, byteCount);
	        byteCount += UINT32_BYTE_SIZE;
	        var southIndices = getUint16Array(data, byteCount, southVertexCount);
	        byteCount += UINT16_BYTE_SIZE * southVertexCount;
			
	        // southIndices = highwaterDecode(southIndices);

			var eastVertexCount = getUint32(data, byteCount);
	        byteCount += UINT32_BYTE_SIZE;
	        var eastIndices = getUint16Array(data, byteCount, eastVertexCount);
	        byteCount += UINT16_BYTE_SIZE * eastVertexCount;
	        // eastIndices = highwaterDecode(eastIndices);

	        var northVertexCount = getUint32(data, byteCount);
	        byteCount += UINT32_BYTE_SIZE;
	        var northIndices = getUint16Array(data, byteCount, northVertexCount);
	        byteCount += UINT16_BYTE_SIZE * northVertexCount;
	        // northIndices = highwaterDecode(northIndices);
	        

	        return {
	        	"header" : header,
	        	"u" : uArray, 
	        	"nw" : nw,
	        	"se" : se,
	        	"v": vArray, 
	        	"heights": heightArray, 
	        	"indices" : indices}
	        //var geom = buildGeometry(uArray, vArray, heightArray, indices);


	 	}

	 	function appendIndices(indices, newIndices) {
	 		console.log(indices.constructor === Array);
	        for (var i = 0; i<newIndices.length; i++) {
	        	indices.push(newIndices[i]);
	        }

	 	}

	 	function highwaterDecode(indices) {

	 		var arr = [];

			var highest = 0;
	        for (i = 0; i < indices.length; ++i) {
	            var code = indices[i];
	            arr.push(highest - code);
	            if (code === 0) {
	                ++highest;
	            }
	        }
	        return arr;
	 	}


	    function zigZagDecode(value) {
	    	// REF CESIUM SOURCE CODE
	        return (value >> 1) ^ (-(value & 1));
	    }
	 	function getHeader(data, byteCount) {

			return {
				centerX : getFloat64(data, byteCount),
			    centerY : getFloat64(data, byteCount + 8),	
			    centerZ : getFloat64(data, byteCount + 16),
			    minimumHeight : getFloat32(data, byteCount + 24),
			    maximumHeight : getFloat32(data, byteCount + 28),
			    boundingSphereCenterX : getFloat64(data, byteCount + 32),
			    boundingSphereCenterY : getFloat64(data, byteCount + 40),
			    boundingSphereCenterZ : getFloat64(data, byteCount + 48),
			    boundingSphereRadius : getFloat64(data, byteCount + 56),
			    horizonOcclusionPointX : getFloat64(data, byteCount + 64),
			    horizonOcclusionPointY : getFloat64(data, byteCount + 72),
			    horizonOcclusionPointZ : getFloat64(data, byteCount + 80)
			}
	 	}
	 	function getVertexCount(data, byteCount) {
	 		var int16View = new Uint16Array(data.slice(byteCount, byteCount+=2));
	 		return int16View[0];
		}
	 	function getTileBounds(tx, ty, zoom) {
	 		//http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_numbers_to_lon..2Flat.
			var n = Math.pow(2, zoom);
			var lon_deg = tx / n * 360.0 -180.0;
			var lat_rad = Math.atan(Math.sinh(Math.PI * (1 - 2 * ty / n)));
			var lat_deg = lat_rad * 180.0 / Math.PI;
			return { lon: lon_deg, lat: lat_deg};
	 	}

	 	function getUint32Array(data, startPos, count) {
	 		return new Uint32Array(data.slice(startPos, startPos + 4*count));
	 	}
	 	function getUint32(data, startPos) {
	 		return getUint32Array(data, startPos, 1)[0];
	 	}
	 	function getUint16Array(data, startPos, count) {
	 		return new Uint16Array(data.slice(startPos, startPos + 2*count));
	 	}
	 	function getUint16(data, startPos) {
	 		return getUint16Array(data, startPos, 1)[0];
	 	}
	 	function getFloat64Array(data, startPos, count) {
	 		return new Float64Array(data.slice(startPos, startPos + 8 * count));
	 	}
	 	function getFloat64(data, startPos) {
	 		return getFloat64Array(data, startPos, 1)[0]; 		
	 	}
	 	function getFloat32Array(data, startPos, count) {
	 		return new Float32Array(data.slice(startPos, startPos + 4*count));
	 	}
	 	function getFloat32(data, startPos) {
	 		return getFloat32Array(data, startPos, 1)[0]; 		
	 	}

	 	return {
	 		parseTile : parseTile
	 	}
	 }

})(qmesh);