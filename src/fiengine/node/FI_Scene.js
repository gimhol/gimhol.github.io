import SceneKeeper from '../keepers/SceneKeeper'
import FI_Node from './FI_Node'
import Engine from '../Engine'

import FI_Node2D from '../2d/node/FI_Node2D'
import FI_Node3D from '../3d/node/FI_Node3D'
import Cube from '../3d/node/Cube'
import FI_Camera3D from '../3d/node/FI_Camera3D'
var a = 0;
export default class FI_Scene extends FI_Node{
  constructor(){
    super()

    this.cameraList = [];

    this.inner2D = new FI_Node2D();
    this.inner2D.hasAdded = true;
    this.inner3D = new FI_Node3D();
    this.inner3D.hasAdded = true;

    this.defalutCamera = this.addChild(new FI_Camera3D());
    this.defalutCamera.setPositionZ(-50);

    this.defalutCamera2 = this.addChild(new FI_Camera3D());
    this.defalutCamera2.setPositionZ(-50);

    for(var x=-1;x<2;++x){
      for(var y=-1;y<2;++y){
        for(var z=-1;z<2;++z){
          if(x==0 && x==y && x==z){
            continue;
          }
          var c0 = this.addChild(new Cube())
          c0.setPositionXYZ(x*6,y*6,z*6)
          // c0.setRotationY(45)
          // c0.setRotationZ(45)
        }
      }
    }
    c0.addChild(new Cube())

  }
  goto(sceneCls){
    SceneKeeper.push(new sceneCls())
  }
  setScale(){

  }

  addChild(child){

    if(child instanceof FI_Node2D){
      return this.inner2D.addChild(child)
    }
    else if(child instanceof FI_Node3D){

      if(child instanceof FI_Camera3D){
        this.cameraList.push(child)
      }

      return this.inner3D.addChild(child)
    }
  }

  removeChild(child){
    if(child instanceof FI_Node2D){
      return this.inner2D.removeChild(child)
    }
    else if(child instanceof FI_Node3D){
      return this.inner3D.removeChild(child)
    }
  }

  _onUpdate(dt){
    if( !super._onUpdate() ){
      return false;
    }
    this.inner3D._onUpdate(dt)
    this.inner2D._onUpdate(dt)

    a+=0.01;
    this.defalutCamera.setYaw(a);
    return true
  }
  _onRender(ctx, gl){
    //3d part.
    this.cameraList.map((camera)=>{
      camera._onCameraLooking(gl)

      this.inner3D._onRender(gl)
    })


    // 2d part.
    ctx.save()
    this.inner2D._onRender(ctx)
    ctx.restore();
  }
}
