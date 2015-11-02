(function(ns) {

	ns.TileViewer = function(divId) {

		var scene, camera, renderer, controls;

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

	
			controls = new THREE.TrackballControls( camera );

			controls.rotateSpeed = 1.0;
			controls.zoomSpeed = 1.2;
			controls.panSpeed = 0.8;

			controls.noZoom = false;
			controls.noPan = false;

			controls.staticMoving = true;
			controls.dynamicDampingFactor = 0.3;

			controls.keys = [ 65, 83, 68 ];

			controls.addEventListener( 'change', render );

			var edgesGeom = new THREE.Geometry();
			var edgestGeom = new THREE.Geometry();
				var max = 32767/100;

			var origo = new THREE.Geometry();
			origo.vertices.push(new THREE.Vector3(0,0,0));

			edgesGeom.vertices.push(new THREE.Vector3(0,0,0));
			edgesGeom.vertices.push(new THREE.Vector3(0,max,0));
			edgesGeom.vertices.push(new THREE.Vector3(max,0,0));
			edgesGeom.vertices.push(new THREE.Vector3(max, max,0));


			edgestGeom.vertices.push(new THREE.Vector3(0,0,150));
			edgestGeom.vertices.push(new THREE.Vector3(0,max,150));
			edgestGeom.vertices.push(new THREE.Vector3(max,0,150));
			edgestGeom.vertices.push(new THREE.Vector3(max, max,150));

			// edgestGeom.faces.push(new THREE.Face3(2,1,0));
			// edgestGeom.faces.push(new THREE.Face3(3,2,0));

			var material = new THREE.PointsMaterial({color: "white", size:25});
			var org = new THREE.Points(origo, material);
			origo = new THREE.Geometry();
			origo.vertices.push(new THREE.Vector3(0,max,0));
			var material = new THREE.PointsMaterial({color: "purple", size:25});
			scene.add(org);
			var material = new THREE.PointsMaterial({color: 'green', size: 20});

			var edgesParticles = new THREE.Points(edgesGeom, material);
			var material = new THREE.PointsMaterial({color: 'yellow', size: 20});
			// var material = new THREE.MeshBasicMaterial({color: 'red'});
			var edgestParticles = new THREE.Points(edgestGeom, material);
			var wireFrame = false;
        	var material = new THREE.MeshLambertMaterial( {wireframe: wireFrame, color: 0x0000ff} );
			scene.add(edgesParticles);
			scene.add(edgestParticles);
			// var material = new THREE.PointsMaterial({size: 2});


        var ambientLight = new THREE.AmbientLight(0xaaaaaa);
        scene.add(ambientLight);

        // add spotlight for the shadows
        var spotLight = new THREE.SpotLight(0xafaffa);
        spotLight.position.set(500, 20, 500);
        spotLight.castShadow = true;
        scene.add(spotLight);


			particles = new THREE.Mesh(geometry, material);

			scene.add(particles);
			renderer = new THREE.WebGLRenderer(); 				/*	Rendererererers particles.	*/
			renderer.setPixelRatio(window.devicePixelRatio);	/*	Probably 1; unless you're fancy.	*/
			renderer.setSize(WIDTH, HEIGHT);					/*	Full screen baby Wooooo!	*/
			renderer.setClearColor(0xffffff, 0);
			container.append(renderer.domElement);		/* Let's add all this crazy junk to the page.	*/

		}


		function animate() {
			requestAnimationFrame(animate);
			render();
				controls.update();
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
	