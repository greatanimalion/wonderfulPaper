import { Ref } from "vue";
import useVnodeStroe from '@/store/useVnodeStore'
import { elementFromPoint } from "@/utils/elementFromPoint";
let offsetX: number, offsetY: number;
let target: HTMLDivElement|null;
let preElement: HTMLDivElement | null = null;
/**
 * @param contain 容器元素
 * @returns 返回一个函数，销毁监听：
 * 创建节点拖动条件 赋予容器内元素拖拽行为
*/
export function VnodeDrag(contain: Ref<HTMLDivElement>) {
   const VnodeStore = useVnodeStroe();

   function dragMouseDown(e: MouseEvent) {
      e.preventDefault();
      offsetX = e.clientX;
      offsetY = e.clientY;
      contain.value.addEventListener('mousemove', elementDrag);
   }
   function stopDrag() {
      preElement?.removeEventListener('mousedown', dragMouseDown);
      preElement?.removeEventListener('mouseup', stopDrag);
      contain.value.removeEventListener('mousemove', elementDrag);
      if (!VnodeStore.curVnode) return;
      VnodeStore.renderVnodeToNode(VnodeStore.curVnode, 'drag', 'rgb(0,0,0)')
      VnodeStore.curVnode.top = +preElement!.style.top.replace('px', '')
      VnodeStore.curVnode.left = +preElement!.style.left.replace('px', '')
      VnodeStore.renderVnodeToNode(VnodeStore.curVnode, 'drag')
      preElement = null;
   }
   function elementDrag(e: MouseEvent) {
      if (!preElement) return;
      e.preventDefault();
      const x = offsetX - e.clientX;
      const y = offsetY - e.clientY;
      offsetX = e.clientX;
      offsetY = e.clientY;
      let curTop = String((+getComputedStyle(preElement).top.replace('px', '')! - y));
      let curLeft = String(+getComputedStyle(preElement).left.replace('px', '')! - x);
      preElement!.style.top = curTop + 'px';
      preElement!.style.left = curLeft + 'px';
   }
   function handle(e: any) {
      if (preElement) {
         preElement.style.outline = 'none'
         preElement.removeAttribute('data-drag');
         VnodeStore.clearTarget()
         preElement = null;
      }
      if (e.target!.className !== 'vnode') return;
      let target = e.target as HTMLDivElement;
      VnodeStore.setTarget(VnodeStore.findVnode(+target.id))
      target!.style.outline = "red 2px solid";
      target!.dataset.drag = 'true';
      preElement = target;
      target.addEventListener('mousedown', dragMouseDown);
      target.addEventListener('mouseup', stopDrag);
   }
   function handleInput(e: any) {
      if (e.target && e.target.className !== 'vnode') return;
      const element = e.target as HTMLDivElement;
      const input = document.createElement('input');
      input.classList.add('inherit-input');
      input.type = 'text';
      input.value = element.innerText;
      element.innerHTML = '';
      element.appendChild(input);
      input.focus();
      input.addEventListener('blur', () => {
         if (input.value === '' && VnodeStore.curVnode) input.value = String(VnodeStore.curVnode.id);
         element.innerHTML = input.value;
      });
   }
   contain.value.addEventListener('click', handle);
   contain.value.addEventListener('dblclick', handleInput)
   return function destory() {
      contain.value.removeEventListener('click', handle);
   }
}

let dragState = {
   startX: 0,
   startY: 0,
   elX: 0,
   elY: 0,
}
/**
 * @param element 元素
 * @returns 返回一个函数，销毁监听：
 * html元素拖拽行为
*/
export function init(contain: HTMLDivElement,callBack0?:Function, callBack?: Function) {
   let lineBorder = document.querySelector<HTMLDivElement>('.el')
   let mouseDownELement: HTMLDivElement|null=null
   contain.onclick = (e: MouseEvent) => {
      let curTarget = elementFromPoint(e);
      if (curTarget?.id.startsWith('el')) {
         target = curTarget!//target 点击的元素
         callBack0 && callBack0(target)
      }else {
         target=null;
         callBack0 && callBack0(null)
      }
   }
   contain.addEventListener("mousedown", startDragEvent);
   contain.addEventListener("mousemove", dragEvent);
   contain.addEventListener('mouseup', () => {
      mouseDownELement = null;
   });
   function dragEvent(e: MouseEvent) {
      if(!target&&!mouseDownELement)return;
      if(mouseDownELement!==target)return 
      let left = e.clientX - dragState.startX + dragState.elX;
      let top = e.clientY - dragState.startY + dragState.elY;
      target!.style.left = `${left}px`;
      target!.style.top = `${top}px`;
      lineBorder!.style.top = top + 'px'
      lineBorder!.style.left = left + 'px'
      callBack && callBack({ left, top })
   }
   function startDragEvent(e: MouseEvent) { 
      if (!target) return;
      mouseDownELement = elementFromPoint(e);
      if (mouseDownELement !== target) return mouseDownELement = null;
      dragState.startX = e.clientX;
      dragState.startY = e.clientY;
      dragState.elX = +target.style.left.replace('px', '');
      dragState.elY = +target.style.top.replace('px', '');
      lineBorder!.style.top = dragState.elY + 'px'
      lineBorder!.style.left = dragState.elX + 'px'
   }
}







// export default function drag(element: HTMLElement) {
//    element.ondragstart = (e: DragEvent) => {
//       (e.dataTransfer as DataTransfer).dropEffect = "move";
//       (e.dataTransfer as DataTransfer).effectAllowed = "move";
//    }
//    element.ondragenter = (e: DragEvent) => {
//       console.log(console.log("enter", e));
//    }
//    element.ondragend = (e: DragEvent) => {
//       console.log("drop", e);
//    }
// }