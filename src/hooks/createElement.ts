import useElementStyleStore from "@/store/elementStyleStore";

export default function createElement(taraget: HTMLDivElement) {
    const elementStyleStore = useElementStyleStore();
    taraget.ondragover = (e :DragEvent) => { e.preventDefault(); }
    taraget.ondrop = (e: any) => {
        console.log(e.dataTransfer.getData('directive'));
        let directive = e.dataTransfer.getData('directive').split(':');
        if (directive[0] === 'create') {
            let element = document.createElement(directive[1]);
            element.style.cssText = elementStyleStore.getCommonElementStyle(directive[1]);
            element.style.position = 'absolute';
            element.style.top = `${e.layerY}px`;
            element.style.left = `${e.layerX}px`;
            element.setAttribute('draggable', 'true');
            element.setAttribute('candrag', 'true');
            taraget.appendChild(element);            
        }
        else {
            
        }
        e.preventDefault()
    }

}
