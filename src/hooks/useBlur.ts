import useVnodeStore from '@/store/useVnodeStore';


function handleSuffix(s: string,key: 'width'|'height'){
    let curVnode = useVnodeStore().curVnode;
    if(!curVnode||!curVnode.parent)return 0;
    if(s.endsWith('px'))return Number(s.slice(0, -2));
    else if(s.endsWith('%'))return (curVnode.parent[key]*(Number(s.slice(0, -1)) / 100));
    return 0
}

/**
 * 处理input的blur事件
*/
let handleBlur:(value:string,key: string)=>void;
export function useBlur() {
    const vnodeStore = useVnodeStore();
    if(!handleBlur)handleBlur=(value:string,key: string)=> { 
        if (!vnodeStore.curVnode) return;
        vnodeStore.curVnode.HTML!.style[key as any] = value;    
        if (key == 'height') return vnodeStore.curVnode.height = handleSuffix(value,'height');
        if (key == 'width') return vnodeStore.curVnode.width = handleSuffix(value,'width');
        if (key == 'position') {
              if (value == 'relative') {
                    vnodeStore.curVnode.drag = false;
                    vnodeStore.curVnode.absoluteLeft = vnodeStore.curVnode.parent?.absoluteLeft || 0;
                    vnodeStore.curVnode.absoluteTop = vnodeStore.curVnode.parent?.absoluteTop || 0;
                    vnodeStore.curVnode.HTML!.style.left = '0px';
                    vnodeStore.curVnode.HTML!.style.top = '0px';
                    vnodeStore.curVnode.top = 0;
                    vnodeStore.curVnode.left = 0;
                    vnodeStore.curVnode.HTML!.classList.remove('move');
                    return;
              }
              vnodeStore.curVnode.drag = true;
              vnodeStore.curVnode.HTML!.classList.add('move');
        }
        if (key == 'left') {
              let left = handleSuffix(value,'width')
              vnodeStore.curVnode.left = left
              vnodeStore.curVnode.absoluteLeft = left
              return 
        }
        if (key == 'top') {
              let top = handleSuffix(value,'height')
              vnodeStore.curVnode.top = top
              vnodeStore.curVnode.absoluteTop = top
              return
        }
    }
    return handleBlur 
}
let handleType:(key: string)=>string;
export function useType() {
    if(!handleType)handleType=(key: string)=> {
        if (key == 'background-color' || key == 'color') return 'color';
        else return 'text';
    }
    return handleType 
}