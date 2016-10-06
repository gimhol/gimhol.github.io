var textureLoader = new TextureLoader();
var keyState = {}
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
  document.addEventListener( 'keydown', onDocumentKeyDown, false );
  document.addEventListener( 'keyup', onDocumentKeyUp, false);
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
  scene.add(ambientLight);
}

function createDirectionalLight(){
  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5,3,5);
  scene.add(light);
}

function createEarth(){
  earth = new Plant({
    'name' : 'earth',
    'di' : 12756,
    'eo' : 23.26,
    'rop' : 23*60*60*1000 + 56*60*1000, //自转周期 毫秒
    'rep' : 365*24*60*60*1000,          //公转周期 毫秒
    'texture'  : 'textures/earth_atmos_4096.jpg'
  })

  var moon = new Plant({
    'name' : 'moon',
    'di' : 3467,
    'eo' : 23.26,
    'rop' : 2360591559,  //自转周期 毫秒
    'rep' : 2360591559,  //公转周期 毫秒
    'around': earth,
    'texture'  : 'textures/earth_atmos_4096.jpg'
  })
  moon.position.x = 384400 * 0.002

  var o1 = new THREE.Object3D()
  o1.add(earth)
  o1.add(moon)
  scene.add(o1)
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
function onDocumentMouseMove(event) {
  //console.log([mouseX,mouseY])
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
function onDocumentKeyUp( event ){
  keyState[event.key] = false
}
function onDocumentKeyDown( event ){
  keyState[event.key] = true
}

var currentTimeStamp = new Date().getTime()
var lastTimeStamp = new Date().getTime()

function animate() {
  requestAnimationFrame( animate );
  currentTimeStamp = new Date().getTime()
  if(keyState.w != keyState.s){
    if(keyState.s){
      camera.position.z += 1
    }else{
      camera.position.z -= 1
    }
  }
  if(keyState.a != keyState.d){
    if(keyState.d){
      camera.position.x += 1
    }else{
      camera.position.x -= 1
    }
  }
  lastTimeStamp = currentTimeStamp
  render();
}

function render() {
  renderer.clear();
  renderer.render( scene, camera );
}
