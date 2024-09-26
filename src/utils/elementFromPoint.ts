import { nextTick, Ref } from "vue";

// let targetEl: HTMLDivElement | null = null;
// let contain: HTMLDivElement | null = null;


/**
 * 传入容器元素，返回销毁函数
*/
export function elementFromPoint(container: Ref<HTMLDivElement>, callback: (el: HTMLDivElement) => void) {
    function handleMouseDown(e: MouseEvent) {
        let target = document.elementFromPoint(e.clientX, e.clientY) as HTMLDivElement | null;
        callback(target!);
    }
    nextTick(() => {
        container.value.addEventListener("mousedown", handleMouseDown);
    })
    return () => {
        container.value.removeEventListener("mousedown", handleMouseDown);
    }
}




// if (target) {
//     //重基本元素框中取出的元素
//     if (target.getAttribute('draggable') === 'true') {
//         target.ondragstart = (e) => {
//             e.dataTransfer!.setData("directive", "create:" + target.innerText);
//         }
//     } else if (target.getAttribute('candrag')) {
//         targetEl = target;
//         // target.style.border = '2px dashed red';
//         contain = document.querySelector('.content')!
//     }
// }