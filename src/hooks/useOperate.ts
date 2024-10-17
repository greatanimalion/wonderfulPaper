import {DirectionType} from "@/types/OperateBorderLine"
import useVnodeStore from "@/store/useVnodeStore";
import usePageStore from "@/store/usePageStore";
import { Vnode } from "@/types/Vnode";
type stateType = {
  startX: number,
  startY: number,
  elWidth: number,
  elHeight: number,
}

//记录鼠标摁下后鼠标移动的距离
const diff={
  x:0,
  y:0,
}
//初始选着的元素的位置信息
const initState: stateType = {
  startX: 0,
  startY: 0,
  elWidth: 0,
  elHeight: 0,
}
//初始元素单独属性，单独记录，避免重复创建销毁属性，造成不必要的性能浪费 ，同时避免密集计算的多余
const elState={
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
    let curVnode = vnodeStore.curVnode;
    if(!curVnode) return
    //记录鼠标按下时的位置,以及元素的宽高
    initState.startX = e.clientX;
    initState.startY = e.clientY;
    initState.elWidth = curVnode.width
    initState.elHeight =curVnode.height
    //获取元素的位置信息
    elState.top=parseFloat(curVnode.HTML!.style.top)
    elState.left=parseFloat(curVnode.HTML!.style.left)
    elState.width=parseFloat(curVnode.HTML!.style.width)
    elState.height=parseFloat(curVnode.HTML!.style.height)
  }
  container.onmousemove = (e: MouseEvent) => {
    if (!flage) return
    diff.x = e.clientX - initState.startX;
    diff.y = e.clientY - initState.startY;
    handleResize(vnodeStore.curVnode!,pageStore.scale);    
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
function handleResize(vnode:Vnode,scale:number) {
  
  if (direction === 'top') {
    writeToStoreState.top = elState.top+diff.y/scale;
    writeToStoreState.height = elState.height-diff.y/scale;

    vnode.top = writeToStoreState.top;
    vnode.height = writeToStoreState.height;
    vnode.HTML!.style.top = `${writeToStoreState.top}px`;
    vnode.HTML!.style.height = `${writeToStoreState.height}px`;
    vnode.absoluteTop = +vnode.parent!.absoluteTop + vnode!.top;
    return 
  }
  if (direction === 'left') {
    writeToStoreState.left = elState.left+diff.x/scale;
    writeToStoreState.width = elState.width-diff.x/scale;

    vnode.HTML!.style.left = `${writeToStoreState.left}px`;
    vnode.HTML!.style.width = `${writeToStoreState.width}px`;
    vnode.left = writeToStoreState.left;
    vnode.width = writeToStoreState.width;
    vnode.absoluteLeft = +vnode.parent!.absoluteLeft + vnode!.left;
    return
  }
  if (direction === 'bottom') {
    writeToStoreState.height = elState.height+diff.y/scale;

    vnode.height = writeToStoreState.height;
    vnode.HTML!.style.height = `${writeToStoreState.height}px`;
    return
  }
  if (direction === 'right') {
    writeToStoreState.width = elState.width+diff.x/scale;

    vnode.width = writeToStoreState.width;
    vnode.HTML!.style.width = `${writeToStoreState.width}px`;
    return
  }
  if (direction === 'rotate') {
    return
  }
}


