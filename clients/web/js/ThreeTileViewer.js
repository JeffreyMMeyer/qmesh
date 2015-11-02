(function(ns) {

	ns.TileViewer = function(divId) {

		var scene, camera, renderer;

		var container, HEIGHT,
			WIDTH, fieldOfView, aspectRatio,
			nearPlane, farPlane,
			parameterCount, particles;

		function init(geometry) {

			HEIGHT = 400;
			WIDTH = 600;
			windowHalfX = WIDTH / 2;
			windowHalfY = HEIGHT / 2;

			fieldOfView = 75;
			aspectRatio = WIDTH / HEIGHT;
			nearPlane = 1;
			farPlane = 3000;

			cameraZ = farPlane / 9;		/*	So, 1000? Yes! move on!	*/
			fogHex = 0x000000;			/* As black as your heart.	*/
			fogDensity = 0.0007; 		/* So not terribly dense?	*/

			camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
			camera.position.z = cameraZ;
				camera.position.x=-300;
				camera.position.y=-300;

			scene = new THREE.Scene();

			container = $('#three');

		

			var edgesGeom = new THREE.Geometry();
			var edgestGeom = new THREE.Geometry();
				var max = 32767/100;

			edgesGeom.vertices.push(new THREE.Vector3(0,0,0));
			edgesGeom.vertices.push(new THREE.Vector3(0,max,0));
			edgesGeom.vertices.push(new THREE.Vector3(max,0,0));
			edgesGeom.vertices.push(new THREE.Vector3(max, max,0));


			edgestGeom.vertices.push(new THREE.Vector3(0,0,50));
			edgestGeom.vertices.push(new THREE.Vector3(0,max,50));
			edgestGeom.vertices.push(new THREE.Vector3(max,0,50));
			edgestGeom.vertices.push(new THREE.Vector3(max, max,50));

			edgestGeom.faces.push(new THREE.Face3(2,1,0));
			edgestGeom.faces.push(new THREE.Face3(3,1,2));


			var material = new THREE.PointsMaterial({color: 'red', size: 20});

			var edgesParticles = new THREE.Points(edgesGeom, material);
			var material = new THREE.PointsMaterial({color: 'blue', size: 20});
			var material = new THREE.MeshBasicMaterial({color: 'red'});
			var edgestParticles = new THREE.Mesh(edgestGeom, material);
	

			scene.add(edgesParticles);
			scene.add(edgestParticles);
			// var material = new THREE.PointsMaterial({size: 2});

			particles = new THREE.Mesh(geometry, material);

			scene.add(particles);
			renderer = new THREE.WebGLRenderer(); 				/*	Rendererererers particles.	*/
			renderer.setPixelRatio(window.devicePixelRatio);	/*	Probably 1; unless you're fancy.	*/
			renderer.setSize(WIDTH, HEIGHT);					/*	Full screen baby Wooooo!	*/

			container.append(renderer.domElement);		/* Let's add all this crazy junk to the page.	*/

		}


		function animate() {
			requestAnimationFrame(animate);
			render();
		}

		function render() {
			camera.lookAt(scene.position);
			renderer.render(scene, camera);		
		}
	 	
	 	function showTile(geometry) {

			init(geometry);
			animate();

	 	}

	 	return {
	 		showTile
	 	}

	};



})(qmesh);
	