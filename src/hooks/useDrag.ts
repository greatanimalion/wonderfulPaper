import { Ref } from "vue";
import useVnodeStroe from '@/store/useVnodeStore'
import usePageStore from "@/store/usePageStore";
import useLayerImgStore from "@/store/useLayerImgStore";
import { elementFromPoint } from "@/utils/elementFromPoint";
import debounce from "@/utils/debounce";
let offsetX: number, offsetY: number;
let target: HTMLDivElement | null;
let preElement: HTMLDivElement | null = null;
/**
 * @param contain 容器元素
 * @returns 返回一个函数，销毁监听：
 * 创建节点拖动条件 赋予容器内元素拖拽行为
*/
export function VnodeDrag(contain: Ref<HTMLDivElement>) {
   const VnodeStore = useVnodeStroe();
   function dragMouseDown(e: MouseEvent) {
      offsetX = e.clientX;
      offsetY = e.clientY;
      contain.value.addEventListener('mousemove', elementDrag);
   }
   function stop() {
      preElement?.removeEventListener('mousedown', dragMouseDown);
      preElement?.removeEventListener('mouseup', stop);
      contain.value.removeEventListener('mousemove', elementDrag);
      if (!VnodeStore.curVnode) return;
      VnodeStore.curVnode.vTop = parseFloat(preElement!.style.top)
      VnodeStore.curVnode.vLeft = parseFloat(preElement!.style.left)
      VnodeStore.curVnode.renderVnodeToNode('drag')
      preElement = null;
   }
   function elementDrag(e: MouseEvent) {
      if (!preElement) return;
      e.preventDefault();
      const x = offsetX - e.clientX;
      const y = offsetY - e.clientY;
      offsetX = e.clientX;
      offsetY = e.clientY;
      let computedStyle = getComputedStyle(preElement);
      let curTop = String((parseFloat(computedStyle.top)! - y));
      let curLeft = String(parseFloat(computedStyle.left)! - x);
      preElement!.style.top = curTop + 'px';
      preElement!.style.left = curLeft + 'px';
   }
   function start(e: any) {
      if (preElement) {
         preElement.style.outline = 'none'
         VnodeStore.clearTarget()
         preElement = null;
      }
      if (e.target!.className.includes== 'vnode') return;
      let target = e.target as HTMLDivElement;
      VnodeStore.setTarget(VnodeStore.findVnode(+target.id))
      target!.style.outline = "red 2px solid";
      preElement = target;
      target.addEventListener('mousedown', dragMouseDown);
      target.addEventListener('mouseup', stop);
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
         if (input.value === '') input.value = String(VnodeStore.curVnode!.id);
         VnodeStore.curVnode!.name = input.value;
         element.innerHTML = input.value;
      });
   }
   contain.value.addEventListener('click', start);
   contain.value.addEventListener('dblclick', handleInput)
}

let dragState = {
   startX: 0,
   startY: 0,
   elX: 0,
   elY: 0,
}
/**
 * @param element 容器元素
 * @returns 返回一个函数，销毁监听：
 * html元素拖拽行为
*/
export function initHTMLDrag(contain: HTMLDivElement) {
   const PageStore = usePageStore();
   const VnodeStore = useVnodeStroe();
   const layerImgStore = useLayerImgStore();
   let setLayerImg = debounce(() => {
      layerImgStore.setLayerImg()
   }, 5000)
   let mouseDownELement: HTMLDivElement | null = null
   contain.onclick = (e: MouseEvent) => {
      let curTarget = elementFromPoint(e);
      if (curTarget == target) return
      if (curTarget?.id.startsWith('el')) {
         if (target) target.classList.remove('move');
         target = curTarget!
         VnodeStore.setTarget(VnodeStore.findVnode(+target.id.replace('el', '')))
         if (VnodeStore.curVnode?.drag) target.classList.add('move');
         return;
      }
      if (target) {
         target.classList.remove('move');
         target = null;
      }
      setTimeout(() => { VnodeStore.clearTarget() }, 0)//防止意外nextick对curVnode的结算处理
   }
   function mousedown(e: MouseEvent) {
      if (!target) return;
      mouseDownELement = elementFromPoint(e);
      if (mouseDownELement !== target) return mouseDownELement = null;
      dragState.startX = e.clientX;
      dragState.startY = e.clientY;
      dragState.elX = parseFloat(target.style.left);
      dragState.elY = parseFloat(target.style.top);
   }
   function mousemove(e: MouseEvent) {      
      if (!VnodeStore.curVnode||!VnodeStore.curVnode.drag) return;
      if (mouseDownELement !== target) return
      let left = (e.clientX - dragState.startX) / PageStore.scale + dragState.elX;
      let top = (e.clientY - dragState.startY) / PageStore.scale + dragState.elY;
      target!.style.left = `${left}px`;
      target!.style.top = `${top}px`;
      VnodeStore.curVnode!.top = top
      VnodeStore.curVnode!.left = left;
      //更新缩略图
      setLayerImg()
   }
   function stop() {

      if (!target || !mouseDownELement) return
      mouseDownELement = null;
      let curVnode = VnodeStore.curVnode!
      curVnode.top = parseFloat(target!.style.top)
      curVnode.left = parseFloat(target!.style.left)
      curVnode.absoluteTop = +curVnode.parent!.absoluteTop + curVnode!.top;
      curVnode.absoluteLeft = +curVnode.parent!.absoluteLeft + curVnode!.left;
   }
   contain.addEventListener("mousedown", mousedown);
   contain.addEventListener("mousemove", mousemove);
   contain.addEventListener('mouseup', stop);
   // contain.addEventListener('mouseleave', stop);
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