var mouseX = 0, mouseY = 0,
windowHalfX = window.innerWidth / 2,
windowHalfY = window.innerHeight / 2,
SEPARATION = 200,
AMOUNTX = 10,
AMOUNTY = 10,
camera, scene, renderer,earth;
var container = document.createElement('div');
document.body.appendChild(container)

init();
animate();

function init() {




  createPerspectiveCamera()
  createScene()
  createRenderer()
  createAmbientLight()
  createDirectionalLight()
  createEarth()

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );
  window.addEventListener( 'resize', onWindowResize, false );
}

function createRenderer(){
  renderer = new THREE.CanvasRenderer({antialias:true,alpha: true  });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColorHex(0x000000, 1.0);//设置
  container.appendChild( renderer.domElement );
}

function createScene(){
  scene = new THREE.Scene();
}

function createPerspectiveCamera(){
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 100;
}

function createAmbientLight(){
  var ambientLight = new THREE.AmbientLight(0x050505, 1.0, 0);
  ambientLight.position.set( 200, 200, 200 );
  scene.add(ambientLight);
}

function createDirectionalLight(){
  var directionalLight = new THREE.DirectionalLight(0xffffff, 1.0, 0);
  directionalLight.position.set( 200, 200, 200 );
  scene.add(directionalLight);
}

function createEarth(){
  var loader = new THREE.TextureLoader();
  loader.load(
    'textures/land_ocean_ice_cloud_2048.jpg',
    function ( texture ) {
      earth = new THREE.Mesh(
        new THREE.SphereGeometry(20,100,50),
        new THREE.MeshBasicMaterial({
          map: texture,
          //color: 0xffffff,
          overdraw:true}) //材质设定
      );
      earth.position.set(0,0,0);
    },
    function (progress){
      console.log(progress)
    },
    function (err){
      earth = new THREE.Mesh(
        new THREE.SphereGeometry(20,100,50),
        new THREE.MeshLambertMaterial({color: 0xffffff,overdraw:true}) //材质设定
      );
      earth.position.set(0,0,0);
    }
  );


  scene.add(earth);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart( event ) {
  if ( event.touches.length > 1 ) {
    event.preventDefault();
    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}

function onDocumentTouchMove( event ) {
  if ( event.touches.length == 1 ) {
    event.preventDefault();
    mouseX = event.touches[ 0 ].pageX - windowHalfX;
    mouseY = event.touches[ 0 ].pageY - windowHalfY;
  }
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  renderer.clear();

  earth && earth.rotateOnAxis (new THREE.Vector3(0,1,0), 0.01)

  renderer.render( scene, camera );
}
