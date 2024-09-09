/**
 * @description 得到元素相对于元素的位置
 * @param {HTMLDivElement} currentElement 要获取位置的元素
 * @param {HTMLDivElement} relativeToElement 相对于的元素
 * @param {string} options 选项，"page"|"subElement"，默认为"page"，表示相对于页面的位置，"subElement"表示相对于子元素的位置
*/
export default function getElementRelativeToElement(e: DragEvent|MouseEvent, relativeToElement: HTMLDivElement, options: "page" | "subElement" = 'page') {
    let finalX: number=0, finalY: number=0;
    if (options === "page") {
        let distanceCorrectionX = e.clientX - relativeToElement.offsetLeft;
        let distanceCorrectionY = e.clientY - relativeToElement.offsetTop;
        //修正距离 + 页面滚动距离
        finalY = distanceCorrectionY + Number(relativeToElement.parentElement!.scrollTop.toFixed(0))
        finalX = distanceCorrectionX + Number(relativeToElement.parentElement!.scrollLeft.toFixed(0))
    }
    else if (options === "subElement") {

    }
    else console.warn("Invalid option for getElementRelativeToElement.");
    return { finalX, finalY }
}