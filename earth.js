var mouseX = 0, mouseY = 0,
windowHalfX = window.innerWidth / 2,
windowHalfY = window.innerHeight / 2,
SEPARATION = 200,
AMOUNTX = 10,
AMOUNTY = 10,
camera, scene, renderer,theSun
init();
animate();
function init() {

  var container, separation = 100, amountX = 50, amountY = 50,
  particles, particle;

  container = document.createElement('div');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 100;
  scene = new THREE.Scene();
  renderer = new THREE.CanvasRenderer({antialias:true,alpha: true  });
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColorHex(0x000000, 1.0);//设置
  container.appendChild( renderer.domElement );

  var light = new THREE.DirectionalLight(0xffffff, 1.0, 0);//设置平行光源
  light.position.set( 200, 200, 200 );//设置光源向量
  scene.add(light);// 追加光源到场景
  var light2 = new THREE.AmbientLight(0x050505, 1.0, 0);//设置平行光源
  light2.position.set( 200, 200, 200 );//设置光源向量
  scene.add(light2);// 追加光源到场景

var theEarthTexture = THREE.ImageUtils.loadTexture("./res/3d/texture/theEarth.jpg");
createEarth()

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );
  window.addEventListener( 'resize', onWindowResize, false );
}

function createEarth(){
  var loader = new THREE.TextureLoader();
  loader.load(
    'file:///F:/project/fimagine.github.com/textures/earth.jpg',
    function ( texture ) {
      alert("!")
    },
    function (progress){
      console.log(progress)
    },
    function (err){
      alert("err")
    }
  );

  theSun = new THREE.Mesh(
    new THREE.SphereGeometry(20,100,50),
    new THREE.MeshLambertMaterial({color: 0xffffff,overdraw:true}) //材质设定
  );
  theSun.position.set(0,0,0);
  scene.add(theSun);
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
  theSun.rotateOnAxis (new THREE.Vector3(0,1,0), 0.01)
  renderer.render( scene, camera );
}
