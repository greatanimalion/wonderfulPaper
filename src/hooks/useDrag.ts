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
      //@ts-ignore
      t = null
      
   }
   function elementDrag(e: MouseEvent) {
      if (!t) return;
      e.preventDefault();
      const x = offsetX - e.clientX;
      const y = offsetY - e.clientY;
      offsetX = e.clientX;
      offsetY = e.clientY;
      let curTop = String((+t!.getAttribute('y')! - y));
      let curLeft = String(+t!.getAttribute('x')! - x);
      t!.setAttribute('y', curTop)
      t!.setAttribute('x', curLeft)
   }
   function handle(e: MouseEvent) {
      if (preElement) {
         preElement.removeAttribute('data-drag');
         preElement.style.stroke = 'white';
         VnodeStore.clearTarget()
      }
      //@ts-ignore
      if(e.target!.tagName !== 'rect')return ;
      let target = e.target as HTMLDivElement;
      VnodeStore.setTarget(VnodeStore.findVnode(+target.id))
      target!.style.stroke = "red";
      target!.dataset.drag = 'true';
      preElement = target;
      target.addEventListener('mousedown', dragMouseDown);
      target.addEventListener('mouseup', stopDrag);
      t = target
   }
   contain.value.addEventListener('click', handle);
   return {
      destory() {
         contain.value.removeEventListener('click', handle);
      }
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