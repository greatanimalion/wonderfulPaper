import { Ref } from "vue";
import useVnodeStroe from '@/store/useVnodeStore'
let offsetX: number, offsetY: number;

let preElement: HTMLDivElement | null = null;
/**
 * @param contain 容器元素
 * @returns 返回一个函数，销毁监听：
 * 创建节点拖动条件 赋予容器内元素拖拽行为
*/
export function VnodeDrag(contain: Ref<HTMLDivElement>) {
   const VnodeStore = useVnodeStroe();
   let t: HTMLDivElement | null;//当前目标元素
   function dragMouseDown(e: MouseEvent) {
      e.preventDefault();
      offsetX = e.clientX;
      offsetY = e.clientY;
      contain.value.addEventListener('mousemove', elementDrag);
   }
   function stopDrag() {
      t?.removeEventListener('mousedown', dragMouseDown);
      t?.removeEventListener('mouseup', stopDrag);
      contain.value.removeEventListener('mousemove', elementDrag);
      if (!VnodeStore.curVnode) return;
      VnodeStore.renderVnodeToNode(VnodeStore.curVnode, 'drag', 'rgb(0,0,0)')
      VnodeStore.curVnode.top = +t!.style.top.replace('px', '')
      VnodeStore.curVnode.left = +t!.style.left.replace('px', '')
      VnodeStore.renderVnodeToNode(VnodeStore.curVnode, 'drag')
   }
   function elementDrag(e: MouseEvent) {
      if (!t) return;
      e.preventDefault();
      const x = offsetX - e.clientX;
      const y = offsetY - e.clientY;
      offsetX = e.clientX;
      offsetY = e.clientY;
      let curTop = String((+getComputedStyle(t).top.replace('px', '')! - y));
      let curLeft = String(+getComputedStyle(t).left.replace('px', '')! - x);
      t!.style.top = curTop + 'px';
      t!.style.left = curLeft + 'px';
   }
   function handle(e: any) {
      if (preElement) {
         preElement.style.outline = 'none'
         preElement.removeAttribute('data-drag');
         VnodeStore.clearTarget()
         t = null
      }
      if (e.target!.className !== 'vnode') return;
      let target = e.target as HTMLDivElement;
      VnodeStore.setTarget(VnodeStore.findVnode(+target.id))
      target!.style.outline = "red 2px solid";
      target!.dataset.drag = 'true';
      preElement = target;
      target.addEventListener('mousedown', dragMouseDown);
      target.addEventListener('mouseup', stopDrag);
      t = target
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

/**
 * @param element 元素
 * @returns 返回一个函数，销毁监听：
 * html元素拖拽行为
*/
export function htmlDrag(target: HTMLDivElement, contain: HTMLDivElement,callBack?:Function) {
   let dragState = {
      startX: 0,
      startY: 0,
      elX: 0,
      elY: 0,
   }

   function dragEvent(e: MouseEvent) {
      let left = e.clientX - dragState.startX + dragState.elX;
      let top = e.clientY - dragState.startY + dragState.elY;
      target.style.left = `${left}px`;
      target.style.top = `${top}px`;
      callBack && callBack({left,top})
   }
   function startDragEvent(e: MouseEvent) {
      dragState.startX = e.clientX;
      dragState.startY = e.clientY;
      dragState.elX = +target.style.left.replace('px', '');
      dragState.elY = +target.style.top.replace('px', '');
      contain.addEventListener("mousemove", dragEvent);
   }
   function removeEventListener() {
      target.removeEventListener("mousedown", startDragEvent);
      target.removeEventListener('mouseup', removeEventListener);
      contain.removeEventListener('mousemove', dragEvent);
   }
   target.addEventListener("mousedown", startDragEvent);
   target.addEventListener('mouseup', removeEventListener);
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