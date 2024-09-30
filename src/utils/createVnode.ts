import { Vnode,VnodeOptions } from '@/types/Vnode';
import { creatUUID } from './creatUUID';
import useVnodeStore from "@/store/useVnodeStore"
export default function createVnode(options:VnodeOptions,p?:Vnode){
    const VnodeStore =useVnodeStore();
    let parent=p?p:VnodeStore.findVnode(0)
    let vnode:Vnode = {
        id:creatUUID(),
        parent,
        children:[],
        top:options.top||0,
        left:options.left||0,
        width:options.width||0,
        height:options.height||0,
        type:options.type||'div',
        style:'',
        events:{},
        text:options.text,
        createElement(){
            
        },
        createVnode(){
            let ract = document.createElement('ract');
            ract.style.cssText="fill: white; stroke: white; stroke-width: 2; fill-opacity: 0.8; stroke-opacity: 0.9;"
            ract.setAttribute('x',this.left.toString());
            ract.setAttribute('y',this.top.toString());
            ract.setAttribute('width',this.width.toString());
            ract.setAttribute('height',this.height.toString());
            document.querySelector('svg')?.appendChild(ract);
        }
    }
    // view 添加
    // parent.children.push(vnode)
    //model 添加
    // VnodeStore.addVnode(parent)
    return vnode
}