import useVnodeStore from '@/store/useVnodeStore'
import useElementStyleStore from '@/store/useElementStyleStore';
import { BASE_ELEMENT,BASE_ELEMENT_STYLE } from "@/const/baseElement";
import Alert from '@/hooks/useAlert';
type BASE_ELEMENT_Type=keyof typeof BASE_ELEMENT
export default function useCreateBaseElement (tag:BASE_ELEMENT_Type){
    const Vnode  = useVnodeStore()
    let targetVnode=Vnode.curVnode;
    let element=createBaseElement(tag);
    if(targetVnode)return targetVnode.HTML!.appendChild(element)
    Alert('info','无目标元素，已自动添加根节点')
    Vnode.plainVnode[0].HTML!.appendChild(element);
}

function createBaseElement(tag:BASE_ELEMENT_Type) {
    const style=useElementStyleStore()
    const element = document.createElement(tag)
    element.style.cssText = style.getCommonElementStyle(tag)||''
    return element
}