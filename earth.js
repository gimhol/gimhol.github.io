var mouseX = 0, mouseY = 0,
windowHalfX = window.innerWidth / 2,
windowHalfY = window.innerHeight / 2,
SEPARATION = 200,
AMOUNTX = 10,
AMOUNTY = 10,
camera, scene, renderer,earth,earth2;
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
  scene.add(ambientLight);
}

function createDirectionalLight(){
  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5,3,5);
  scene.add(light);
}

function loadTexture(name,url){
  var loader = new THREE.TextureLoader();
  loader.load(
    url,
    function ( texture ) {
      window.textures = window.textures || {}
      window.textures[name] = texture
      typeof window.onTexturesLoad === 'function' && window.onTexturesLoad(name,texture)
    },
    function (progress){
      console.log(name+': '+ progress.loaded + '/' + progress.total)
    },
    function (err){}
  );
}

function createEarth(){
  earth = new THREE.Mesh(
    new THREE.SphereGeometry(30,25,15),
    new THREE.MeshBasicMaterial({
      wireframe:true,
      wireframeLinewidth:1,
      overdraw:0.4,
    }) //材质设定
  );
  earth.position.set(0,0,0);
  scene.add(earth);
  window.onTexturesLoad = function(name,texture){
    if(
      window.textures['earth_map_normal'] &&
      window.textures['earth_map_bump'] &&
      window.textures['earth_map_specular']){
      earth.material = new THREE.MeshPhongMaterial({
        map: window.textures['earth_map_normal'],
        bumpMap   : window.textures['earth_map_bump'],
        specularMap: window.textures['earth_map_specular'],
        bumpScale :  1,
        specular: new THREE.Color('grey'),
        color: 0xffffff,
        overdraw:0.5
      })//材质设定
    }
  };
  loadTexture('earth_map_normal'  ,'https://gimhol.github.io/textures/earth_atmos_4096.jpg')
  loadTexture('earth_map_bump'    ,'https://gimhol.github.io/textures/earth_normal_2048.jpg')
  loadTexture('earth_map_specular','https://gimhol.github.io/textures/earth_specular_2048.jpg')
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
