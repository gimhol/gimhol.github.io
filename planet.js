var faster  = 3600
var smaller = 0.002

function Plant(data){
  THREE.Mesh.call(this)
  this.name = data.name || '';
  this.di = data.di || 10;    //diameter直径
  this.eo = data.eo || 0;     //ecliptic obliquity 黄赤交角
  this.rop = data.rop || 0;   //rotation period 自转周期
  this.rep = data.rep || 0;   //revolution period 公转周期
  this.around = data.around;  //公转中心
  this.textureUrl  = data.texture || '';  //贴图
  this.geometry = new THREE.SphereGeometry(smaller*this.di,25,15)
  this.materialConfig = {
    wireframe:true,
    wireframeLinewidth:0.5,
    overdraw:0.4,
  }
  this.material = new THREE.MeshBasicMaterial(this.materialConfig)
  this.rotation.z = -this.eo * Math.PI / 180;
  textureLoader.load(this.textureUrl, this.textureUrl)
  textureLoader.addLoadEventListener(this)

  this.animate()
}
Plant.prototype = Object.assign( Object.create( THREE.Mesh.prototype ),{
  constructor: Plant,
  animate: function(e){
    setTimeout(()=>this.animate(),50/3)
    this.rotateOnAxis (new THREE.Vector3(0,1,0),faster*(50/3)*2*Math.PI/this.rop)
  },
  onLoadSuccess: function(name,url,texture){
    if(url === this.textureUrl){
      this.material = new THREE.MeshPhongMaterial({
        map: texture,
        //bumpMap   : textureLoader.textures['earth_map_bump'],
        //specularMap: textureLoader.textures['earth_map_specular'],
        bumpScale :  1,
        specular: new THREE.Color('grey'),
        color: 0xffffff,
        overdraw:0.5
      })
      textureLoader.removeLoadEventListener(this)
    }
  }
})
