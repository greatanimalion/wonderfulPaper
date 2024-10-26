import useVnodeStore from '@/store/useVnodeStore'
import useElementStyleStore from '@/store/useElementStyleStore';
import { ElementType } from "@/const/elementType";
export const useCreateBaseElement = (tag: ElementType) => {
    const Vnode  = useVnodeStore()
    let targetVnode=Vnode.curVnode;
    
}

function createBaseElement(tag: ElementType) {
    const style=useElementStyleStore()
    const element = document.createElement(tag)
    element.style.cssText = style.getCommonElementStyle(tag)||''
    return element
}