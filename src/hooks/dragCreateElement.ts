/**
 * 重基本元素中拖出元素并创建新元素
*/

import { useElementStyleStore, useLayerThumbnail, usePageStore } from "@/store";
import { parseCss } from "@/utils/parseCss";
//距离纠正
let distanceCorrectionX = 0, distanceCorrectionY = 0;
let finalX = 0, finalY = 0;
let pageStore: any
export default function dragCreateElement(taraget: HTMLDivElement, currentPageId: number) {
    const layerThumbnail = useLayerThumbnail();
    const elementStyleStore = useElementStyleStore();
    taraget.ondragover = (e: DragEvent) => { e.preventDefault(); }
    taraget.ondrop = (e: DragEvent) => {
        console.log(e.dataTransfer?.getData('directive'));
        distanceCorrectionX = distanceCorrectionX ? distanceCorrectionX : e.screenX - e.layerX;
        distanceCorrectionY = distanceCorrectionY ? distanceCorrectionY : e.screenY - e.layerY;
        finalY = e.screenY - distanceCorrectionY + Number(taraget.parentElement!.scrollTop.toFixed(0))
        finalX = e.screenX - distanceCorrectionX + Number(taraget.parentElement!.scrollLeft.toFixed(0))
        let directive = e.dataTransfer?.getData('directive').split(':') || [];
        if (directive[0] === 'create') {
            let element = document.createElement(directive[1]);
            taraget.appendChild(element);
            element.style.cssText = elementStyleStore.getCommonElementStyle(directive[1]) || '';
            element.style.top = `${finalY}px`;
            element.style.left = `${finalX}px`;
            element.setAttribute('draggable', 'true');
            element.setAttribute('candrag', 'true');
            element.style.position = 'absolute';
            layerThumbnail.resetLayerThumbnail(currentPageId)
            let height = parseCss(element.style.cssText, ['heigth'])['height'].replace('px', '')
            let width = parseCss(element.style.cssText, ['width'])['width'].replace('px', '')
            pageStore = pageStore || usePageStore()
            pageStore.getCurrentPage()?.pageElements.push({
                id: Date.now(),
                el: element,
                parent: taraget,
                style: element.style.cssText,
                children: [],
                resizeHeight: (Number(height) * pageStore.getCurrentPage().zoom).toFixed(0),
                resizeWidth: (Number(width) * pageStore.getCurrentPage().zoom).toFixed(0),
                height: width,
                width: height,
            })
        }
        e.preventDefault()
    }
}
