import { Vnode } from "@/types/Vnode";
import { isRef } from "vue";
import {Ref } from "vue";

export default function drawGrid(canvas: Ref<HTMLCanvasElement>) {
    const ctx = canvas.value.getContext('2d')!;
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
    canvas.value.style.position = 'absolute';
    canvas.value.style.top = '0';
    canvas.value.style.left = '0';
    const cellSize=20
    const numRows = canvas.value.height / cellSize ;
    const numCols =canvas.value.width / cellSize;
    ctx.lineWidth = 1;
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, 0, 0, 50, 50, 50);
    ctx.bezierCurveTo(50, 50, 100, 50, 100, 100);
    ctx.strokeStyle = 'rgba(255,255,255, 0.7)';
    ctx.lineWidth = 2;
    ctx.stroke();
}
/**
 * @param target 虚拟节点
 * @param color 绘制颜色
 * @param Canvas 容器
*/
export function drawBezierCurveFromParent(target:Vnode,color:string= 'rgba(255,255,255, 0.7)',Canvas?: Ref<HTMLCanvasElement>|HTMLCanvasElement) {
    if(!target.parent)return 
    // @ts-ignore
    let canvas:HTMLCanvasElement=(isRef(Canvas)?Canvas.value:Canvas)||document.getElementsByTagName<HTMLCanvasElement>('canvas')
    const ctx =canvas.getContext('2d')!;
    let y1=target.parent.top+target.parent.height;
    let x1=target.parent.left+target.parent.width/2;
    let x2=target.left+target.width/2;
    let y2=target.top;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.bezierCurveTo(x1, y1,x1,(y1+y2)/2,(x1+x2)/2, (y1+y2)/2);
    ctx.bezierCurveTo((x1+x2)/2, (y1+y2)/2,x2, (y1+y2)/2, x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();    
}