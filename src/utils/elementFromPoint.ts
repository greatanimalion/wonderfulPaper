
/**

*/
export function elementFromPoint(e: MouseEvent) {
    return document.elementFromPoint(e.clientX, e.clientY) as HTMLDivElement  | null;
}




// let targetEl: HTMLDivElement | null = null;
// let contain: HTMLDivElement | null = null;

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