import {DirectionType} from "@/types/OperateBorderLine"
import useVnodeStore from "@/store/useVnodeStore";
import usePageStore from "@/store/usePageStore";
import { Vnode } from "@/types/Vnode";
type stateType = {
  startX: number,
  startY: number,
  elTop: number,
  elLeft: number,
  elWidth: number,
  elHeight: number,
}

//记录鼠标摁下后鼠标移动的距离
const diff={
  x:0,
  y:0,
}
//初始选着的元素的位置信息
const diffState: stateType = {
  startX: 0,
  startY: 0,
  elTop: 0,
  elLeft: 0,
  elWidth: 0,
  elHeight: 0,
}
//初始元素单独属性，单独记录，避免重复创建销毁属性，造成不必要的性能浪费 ，同时避免密集计算的多余
const elState={
  CTop:0,
  CLeft:0,
  top:0,
  left:0,
  width:0,
  height:0,
}
//初始元素单独属性，单独记录，避免重复创建销毁属性，造成不必要的性能浪费 ，同时避免密集计算的多余
const writeToStoreState={
  top:0,
  left:0,
  width:0,
  height:0,
}
let flage = false;
let direction: DirectionType ="top"

export default function useOperate() {
  const vnodeStore = useVnodeStore();
  const pageStore = usePageStore();
  let container = document.querySelector<HTMLDivElement>('.show-content')!;
  container.onmousedown = (e: MouseEvent) => {
    if(!vnodeStore.curVnode) return
    //记录鼠标按下时的位置
    diffState.startX = e.clientX;
    diffState.startY = e.clientY;
    diffState.elTop = vnodeStore.curVnode.top
    diffState.elLeft = vnodeStore.curVnode.left
    diffState.elWidth = vnodeStore.curVnode.width
    diffState.elHeight =vnodeStore.curVnode.height
    //获取元素的位置信息
    elState.top=parseFloat(vnodeStore.curVnode.HTML!.style.top)
    elState.left=parseFloat(vnodeStore.curVnode.HTML!.style.left)
    elState.width=parseFloat(vnodeStore.curVnode.HTML!.style.width)
    elState.height=parseFloat(vnodeStore.curVnode.HTML!.style.height)
    //获取组件的位置信息
    elState.CTop=vnodeStore.curVnode.top
    elState.CLeft=vnodeStore.curVnode.left
  }
  container.onmousemove = (e: MouseEvent) => {
    if (!flage) return
    diff.x = e.clientX - diffState.startX;
    diff.y = e.clientY - diffState.startY;
    handleResize(vnodeStore.curVnode!,vnodeStore.curVnode!,pageStore.scale);    
  }
  container.onmouseup = () => {
    flage = false;
  }
  const setDirection=(type:DirectionType)=>{
    direction=type
    flage = true;
  }
  return setDirection;
}

/**
 * @param type 方向类型
*/
function handleResize(curState:Vnode,vnode:Vnode,scale:number) {
  
  if (direction === 'top') {
    writeToStoreState.top = elState.top+diff.y/scale;
    writeToStoreState.height = elState.height-diff.y/scale;

    curState.top = elState.CTop+diff.y/scale;
    curState.height = writeToStoreState.height+2;
    curState.HTML!.style.top = `${writeToStoreState.top}px`;
    curState.HTML!.style.height = `${writeToStoreState.height}px`;

    vnode.top = writeToStoreState.top;
    vnode.height =  writeToStoreState.height;
    return 
  }
  if (direction === 'left') {
    writeToStoreState.left = elState.left+diff.x/scale;
    writeToStoreState.width = elState.width-diff.x/scale;

    curState.left = elState.CLeft+diff.x/scale;
    curState.width = writeToStoreState.width;
    curState.HTML!.style.left = `${writeToStoreState.left}px`;
    curState.HTML!.style.width = `${writeToStoreState.width}px`;

    vnode.left = writeToStoreState.left;
    vnode.width = writeToStoreState.width;
    return
  }
  if (direction === 'bottom') {
    writeToStoreState.height = elState.height+diff.y/scale;

    curState.height = writeToStoreState.height+2;
    curState.HTML!.style.height = `${writeToStoreState.height}px`;

    vnode.height = writeToStoreState.height;
    return
  }
  if (direction === 'right') {
    writeToStoreState.width = elState.width+diff.x/scale;

    curState.width = writeToStoreState.width;
    curState.HTML!.style.width = `${writeToStoreState.width}px`;

    vnode.width = writeToStoreState.width;
    return
  }
  if (direction === 'rotate') {
    return
  }
}


