import { isRef, nextTick, Ref } from "vue";

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

let offsetX: number, offsetY: number;
export function VnodeDrag(contain: Ref<HTMLDivElement>) {
   let t: HTMLDivElement | null;
   let dragMouseDown: (e: MouseEvent) => void;
   return function () {
      function init(target: HTMLDivElement) {
          dragMouseDown=function(e: MouseEvent) {
            e.preventDefault();
            offsetX = e.clientX;
            offsetY = e.clientY;
            contain.value.addEventListener('mousemove', elementDrag);
         }
         function elementDrag(e: MouseEvent) {
            if (!t) return;
            e.preventDefault();
            const x = offsetX - e.clientX;
            const y = offsetY - e.clientY;
            offsetX = e.clientX;
            offsetY = e.clientY;
            let curTop = String(+t!.getAttribute('y')! - y);
            let curLeft = String(+t!.getAttribute('x')! - x);
            t!.setAttribute('y', curTop)
            t!.setAttribute('x', curLeft)
         }
         function stopDrag() {
            t?.removeEventListener('mousemove', dragMouseDown);
            t?.removeEventListener('mouseup', stopDrag);
            //@ts-ignore
            t = null
         }
         t=target
         t!.addEventListener('mousedown', dragMouseDown);
         t!.addEventListener('mouseup', stopDrag);
      }
      return {
         destory() {
            contain.value.removeEventListener('mousedown', dragMouseDown);
         },
         setNew(target: Ref<HTMLDivElement>|HTMLDivElement) {
            nextTick(() => {
               init(isRef(target) ? target.value : target)
            })
         }
      }
   }
}
