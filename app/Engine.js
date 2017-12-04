import React from 'react';
import FI_Node from './base/FINode'
import FI_Image from './base/component/FIImage'

export default class Engine {
  static getInstance(){
    if(!this.instance){
      this.instance = new Engine()
    }
    return this.instance;
  }

  constructor(){
    this.lastUpdateTime = 0
  }

  launch(canvas){

    this.canvas = canvas;
    this.canvas.width = 800;
    this.canvas.height = 600;
    var ctx = this.canvas.getContext('2d');

    console.log(ctx)

    this.rootNode = new FI_Node()
    this.rootNode.size = {width: 250, height: 250}
    this.rootNode.position = {x: 250, y: 250}
    this.rootNode.scale = {x:0.5,y:0.5}
    this.rootNode.rotate = 3
    this.rootNode.addComponent(new FI_Image('../textures/moon_1024.jpg'))

    var a = new FI_Node()
    a.size = {width: 250, height: 250}
    a.position = {x: 250, y: 250}
    a.scale = {x:0.5,y:0.5}
    a.rotate = 3
    a.addComponent(new FI_Image('../textures/moon_1024.jpg'))

    this.rootNode.children.push(a)

    var a = new FI_Node()
    a.size = {width: 250, height: 250}
    a.position = {x: 0, y: 250}
    a.scale = {x:0.5,y:0.5}
    a.rotate = 3
    a.addComponent(new FI_Image('../textures/moon_1024.jpg'))

    this.rootNode.children.push(a)

    this.looper(0);
  }

  looper(updateTime){

    this.update(updateTime-this.lastUpdateTime)

    this.lastUpdateTime = updateTime;

    window.requestAnimationFrame(this.looper.bind(this))
  }

  update(dt){
    var ctx = this.canvas.getContext('2d')
    ctx.save();

    this.rootNode.draw(ctx);
    ctx.restore()
  }
}
