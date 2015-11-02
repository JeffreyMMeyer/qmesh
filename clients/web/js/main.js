
	var $threeDiv = $('#three');

	var visualizer;

	// var url = "http://assets.agi.com/stk-terrain/world/13/1301/8499.terrain?v=1.16389.0";


    var headerTemplate = _.template( $('#tile-header-template').html());


 	function buildGeometry(u, v, heights, indices) {

 		var geometry = new THREE.Geometry();

 		for (var i = 0; i < u.length; i++) {
 			geometry.vertices.push(new THREE.Vector3(u[i]/100, v[i]/100, heights[i]/100));
 		}

 		for (var i = 0; i < indices.length; i+=3) {
			geometry.faces.push(new THREE.Face3(indices[i-2], indices[i-1], indices[i]));				
 		}

		// geometry.computeFaceNormals();
		// geometry.computeVertexNormals();

		return geometry;

 	}
