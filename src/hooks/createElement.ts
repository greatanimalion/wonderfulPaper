import useElementStyleStore from "@/store/elementStyleStore";
import { nextTick } from "vue";

//距离纠正
let distanceCorrectionX = 0, distanceCorrectionY = 0;
let finalX = 0, finalY = 0;
export default function createElement(taraget: HTMLDivElement) {
    const elementStyleStore = useElementStyleStore();
    taraget.ondragover = (e: DragEvent) => { e.preventDefault(); }
    taraget.ondrop = (e: DragEvent) => {
        console.log(e.dataTransfer?.getData('directive'));
        distanceCorrectionX = distanceCorrectionX ? distanceCorrectionX : e.screenX - e.layerX;
        distanceCorrectionY = distanceCorrectionY ? distanceCorrectionY : e.screenY - e.layerY;
        finalY=e.screenY-distanceCorrectionY+Number(taraget.parentElement!.scrollTop.toFixed(0))
        finalX=e.screenX-distanceCorrectionX+Number(taraget.parentElement!.scrollLeft.toFixed(0))
        let directive = e.dataTransfer?.getData('directive').split(':') || [];
        if (directive[0] === 'create') {
            let element = document.createElement(directive[1]);
            taraget.appendChild(element);
            element.style.cssText = elementStyleStore.getCommonElementStyle(directive[1]) || '';
            element.style.top = `${finalY}px`;
            element.style.left = `${finalX}px`;
            element.setAttribute('draggable', 'true');
            element.setAttribute('candrag', 'true');
            nextTick(() => { element.style.position = 'absolute'; })
        }
        else {

        }
        e.preventDefault()
    }

}
