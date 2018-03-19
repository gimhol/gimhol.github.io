// 基础类型
import * as FI_Math from './math/Root';
export const FI_Rect = FI_Math.FI_Rect;
export const FI_Vector2D = FI_Math.FI_Vector2D;
export const FI_Size2D = FI_Math.FI_Size2D;
export const FI_Line2D = FI_Math.FI_Line2D;
export const FI_Vector3D = FI_Math.FI_Vector3D;
export const FI_Size3D = FI_Math.FI_Size3D;

import Scene from './node/FI_Scene'
export const FI_Scene = Scene;


// 通用组件
import InputResponser from './component/FI_InputResponser'
export const FI_InputResponser = InputResponser

/* 2D */
import Node2D from './2d/node/FI_Node2D'
export const FI_Node2D = Node2D;

// component
import * as Component2D from './2d/component/Root'
export const FI_Draw = Component2D.FI_Draw;
export const FI_Touchable = Component2D.FI_Touchable;
export const FI_Text = Component2D.FI_Text;
export const FI_Image = Component2D.FI_Image;
export const FI_Mover = Component2D.FI_Mover;
export const FI_Frame = Component2D.FI_Frame
export const FI_Animation = Component2D.FI_Frame
export const FI_Animator = Component2D.FI_Animator


// keeper
import SceneKeeper from './keepers/SceneKeeper'
export const FI_SceneKeeper = SceneKeeper
