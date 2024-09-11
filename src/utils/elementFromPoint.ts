import getElementRelativeToElement from "./getElementRelativeToElement";
import { usePageStore } from "@/store";
import { getTagetMapChild } from "./getTagetMapChild";
let targetEl: HTMLDivElement | null = null;
let contain: HTMLDivElement | null = null;
document.addEventListener("mousedown", (e: MouseEvent) => {
    let target = document.elementFromPoint(e.clientX, e.clientY) as HTMLDivElement | null;
    if (target) {
        //重基本元素框中取出的元素
        if (target.getAttribute('draggable') === 'true') {
            target.ondragstart = (e) => {
                e.dataTransfer!.setData("directive", "create:" + target.innerText);
            }
        } else if (target.getAttribute('candrag')) {
            targetEl = target;
            // target.style.border = '2px dashed red';
            contain = document.querySelector('.content')!
        }
    }
})
document.addEventListener('mouseup', () => {
    if (targetEl) {
        // targetEl.style.border = 'none';
        let pageStore = usePageStore();
        let id = targetEl.id.replace('el', '');
        let curPage = pageStore.getCurrentPage()!;
        let vNode = getTagetMapChild(curPage.children, Number(id))
        if (vNode) {
            vNode.resizeTop = targetEl.offsetTop + '';
            vNode.resizeLeft = targetEl.offsetLeft + '';
            vNode.top = targetEl.offsetTop/curPage.zoom;
            vNode.left = targetEl.offsetLeft/curPage.zoom;
        }
    }
    targetEl = null;
})
document.addEventListener('mousemove', (e: MouseEvent) => {
    if (targetEl && contain) {
        let { finalX, finalY } = getElementRelativeToElement(e, contain!, 'page');
        finalX -= targetEl.offsetWidth / 2;
        finalY -= targetEl.offsetHeight / 2;
        targetEl.style.top = finalY + 'px';
        targetEl.style.left = finalX + 'px';
    }
})