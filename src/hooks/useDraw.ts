import { Vnode } from "@/types/Vnode";
import type { Ref } from "vue";

export default function drawGrid(canvas: Ref<HTMLCanvasElement>) {
    const ctx = canvas.value.getContext('2d')!;
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
    canvas.value.style.position = 'absolute';
    canvas.value.style.top = '0';
    canvas.value.style.left = '0';
    const cellSize = 20
    const numRows = canvas.value.height / cellSize;
    const numCols = canvas.value.width / cellSize;
    ctx.lineWidth = 1;
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
}
/**
 * @param target 虚拟节点
 * @param color 绘制颜色
 * @param Canvas 容器
*/
export function drawBezierCurveFromParent(target:Vnode,color:string= 'white') {
    if(!target||!target.parent)return 
    target.lineToParent?.remove();
    
    let svg=document.querySelector('.svg') as SVGAElement;
    let y1=target.parent.vTop+target.parent.vHeight;
    let x1=target.parent.vLeft+target.parent.vWidth/2;
    let x2=target.vLeft+target.vWidth/2;
    let y2=target.vTop;  
    const path = document.createElementNS("http://www.w3.org/2000/svg",'path');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', 'none');
    // 设置四次贝塞尔曲线的控制点和终点坐标
    const controlPoint1 = { x: x1, y: y1 };
    const controlPoint2 = { x: x1, y: (y1 + y2) / 2 };
    const controlPoint3 = { x: x2, y: (y1 + y2) / 2 };
    const endPoint = { x: x2, y: y2 };
    path.setAttribute('d', `M${controlPoint1.x},${controlPoint1.y} C${controlPoint2.x},${controlPoint2.y} ${controlPoint3.x},${controlPoint3.y} ${endPoint.x},${endPoint.y}`);
    svg.appendChild(path);
    target.lineToParent=path;
}