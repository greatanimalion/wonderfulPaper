import {ElInfor,DirectionType} from "@/types/OperateBorderLine"
import {Reactive } from "vue";

type stateType = {
  startX: number,
  startY: number,
  elTop: number,
  elLeft: number,
  elWidth: number,
  elHeight: number,
}

const diff={
  x:0,
  y:0,
}
const diffState: stateType = {
  startX: 0,
  startY: 0,
  elTop: 0,
  elLeft: 0,
  elWidth: 0,
  elHeight: 0,
}
const elState={
  top:0,
  left:0,
  width:0,
  height:0,
}
let flage = false;
let direction: DirectionType ="top"

export default function useOperate(curState: Reactive<ElInfor>) {
  let container = document.querySelector<HTMLDivElement>('.content')!;
  container.onmousedown = (e: MouseEvent) => {
    flage = true;
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
  }
  container.onmousemove = (e: MouseEvent) => {
    if (!flage) return
    diff.x = e.clientX - diffState.startX;
    diff.y = e.clientY - diffState.startY;
    handleResize(curState);
  }
  container.onmouseup = () => {
    flage = false;
  }
  const setDirection=(type:DirectionType)=>{
    direction=type
  }
  return setDirection;
}

/**
 * @param type 方向类型
*/
function handleResize(curState:ElInfor) {
  //+1是小点哥高度原因
  if (direction === 'top') {
    curState.top = diffState.elTop + diff.y-1;
    curState.height = diffState.elHeight - diff.y;

    curState.el!.style.top = `${elState.top+diff.y}px`;
    curState.el!.style.height = `${elState.height-diff.y}px`;
    return 
  }
  if (direction === 'left') {
    curState.left = diffState.elLeft + diff.x;
    curState.width = diffState.elWidth - diff.x;
    curState.el!.style.left = `${elState.left+diff.x}px`;
    curState.el!.style.width = `${elState.width-diff.x}px`;
    return
  }
  if (direction === 'bottom') {
    curState.height = diffState.elHeight + diff.y - 1;
    curState.el!.style.height = `${elState.height+diff.y}px`;
    return
  }
  if (direction === 'right') {
    curState.width = diffState.elWidth + diff.x;
    curState.el!.style.width = `${elState.width+diff.x}px`;
    return
  }
  if (direction === 'rotate') {
    return
  }
}


