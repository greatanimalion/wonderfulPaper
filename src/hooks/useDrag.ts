import {  Ref } from "vue";
import useVnodeStroe from '@/store/useVnodeStore'
let offsetX: number, offsetY: number;

let preElement: HTMLDivElement | null = null;
/**
 * @param contain 容器元素
 * @returns 返回一个函数，销毁监听：
 * 创建拖动条件 赋予容器内元素拖拽行为
*/
export function VnodeDrag(contain: Ref<HTMLDivElement>) {
   const VnodeStore=useVnodeStroe();
   let t: HTMLDivElement | null;
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
      if (!VnodeStore.curVnode)return ;
      VnodeStore.renderVnodeToNode(VnodeStore.curVnode,'drag','rgb(0,0,0)')
      VnodeStore.curVnode.top=+t!.style.top.replace('px','')
      VnodeStore.curVnode.left=+t!.style.left.replace('px','')
      VnodeStore.renderVnodeToNode(VnodeStore.curVnode,'drag')
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
      t!.style.top = curTop+'px';
      t!.style.left = curLeft+'px';
   }
   function handle(e: MouseEvent) {
      if (preElement) {
         preElement.style.outline='none'
         preElement.removeAttribute('data-drag');
         VnodeStore.clearTarget()
         t=null
      }
      //@ts-ignore
      if(e.target!.className !== 'vnode')return ;
      let target = e.target as HTMLDivElement;
      VnodeStore.setTarget(VnodeStore.findVnode(+target.id))
      target!.style.outline = "red 2px solid";
      target!.dataset.drag = 'true';
      preElement = target;
      target.addEventListener('mousedown', dragMouseDown);
      target.addEventListener('mouseup', stopDrag);
      t = target      
   }
   contain.value.addEventListener('click', handle);
   contain.value.addEventListener('dblclick', (e:any)=>{
      if(e.target&&e.target.className !== 'vnode')return ;
      const element = e.target as HTMLDivElement;
      const input = document.createElement('input');
      input.classList.add('inherit-input');
      input.type = 'text';
      input.value = element.innerText;
      element.innerHTML = '';
      element.appendChild(input);
      input.focus();
      input.addEventListener('blur', () => {
         element.innerHTML = input.value;
      });
      
      
   })
   return function destory(){
         contain.value.removeEventListener('click', handle);
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