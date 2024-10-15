import {ElInfor,DirectionType} from "@/types/OperateBorderLine"
import {Reactive } from "vue";
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

export default function useOperate(curState: Reactive<ElInfor>) {
  const vnodeStore = useVnodeStore();
  const pageStore = usePageStore();
  let container = document.querySelector<HTMLDivElement>('.show-content')!;
  container.onmousedown = (e: MouseEvent) => {
    if(!vnodeStore.curVnode) return
    //记录鼠标按下时的位置
    diffState.startX = e.clientX;
    diffState.startY = e.clientY;
    diffState.elTop = curState.top
    diffState.elLeft = curState.left
    diffState.elWidth = curState.width
    diffState.elHeight =curState.height
    //获取元素的位置信息
    elState.top=+curState.el!.style.top.replace('px','')
    elState.left=+curState.el!.style.left.replace('px','')
    elState.width=+curState.el!.style.width.replace('px','')
    elState.height=+curState.el!.style.height.replace('px','')
    //获取组件的位置信息
    elState.CTop=curState.top
    elState.CLeft=curState.left
  }
  container.onmousemove = (e: MouseEvent) => {
    if (!flage) return
    diff.x = e.clientX - diffState.startX;
    diff.y = e.clientY - diffState.startY;
    handleResize(curState,vnodeStore.curVnode!,pageStore.scale);    
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
function handleResize(curState:ElInfor,vnode:Vnode,scale:number) {
  
  if (direction === 'top') {
    writeToStoreState.top = elState.top+diff.y/scale;
    writeToStoreState.height = elState.height-diff.y/scale;

    curState.top = elState.CTop+diff.y/scale;
    curState.height = writeToStoreState.height+2;
    curState.el!.style.top = `${writeToStoreState.top}px`;
    curState.el!.style.height = `${writeToStoreState.height}px`;

    vnode.top = writeToStoreState.top;
    vnode.height =  writeToStoreState.height;
    return 
  }
  if (direction === 'left') {
    writeToStoreState.left = elState.left+diff.x/scale;
    writeToStoreState.width = elState.width-diff.x/scale;

    curState.left = elState.CLeft+diff.x/scale;
    curState.width = writeToStoreState.width+2;
    curState.el!.style.left = `${writeToStoreState.left}px`;
    curState.el!.style.width = `${writeToStoreState.width}px`;

    vnode.left = writeToStoreState.left;
    vnode.width = writeToStoreState.width;
    return
  }
  if (direction === 'bottom') {
    writeToStoreState.height = elState.height+diff.y/scale;

    curState.height = writeToStoreState.height+2;
    curState.el!.style.height = `${writeToStoreState.height}px`;

    vnode.height = writeToStoreState.height;
    return
  }
  if (direction === 'right') {
    writeToStoreState.width = elState.width+diff.x/scale;

    curState.width = writeToStoreState.width+2;
    curState.el!.style.width = `${writeToStoreState.width}px`;

    vnode.width = writeToStoreState.width;
    return
  }
  if (direction === 'rotate') {
    return
  }
}


