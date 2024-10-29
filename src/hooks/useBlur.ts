import useVnodeStore from '@/store/useVnodeStore';

/**
 * 处理input的blur事件
*/
let handleBlur:(value:string,key: string)=>void;
export function useBlur() {
    const vnodeStore = useVnodeStore();
    if(!handleBlur)handleBlur=(value:string,key: string)=> { 
        if (!vnodeStore.curVnode) return;
        let originVlaue = vnodeStore.curVnode.HTML!.style[key as any];
        if (originVlaue == value) return;
        vnodeStore.curVnode.HTML!.style[key as any] = value;
        if (key == 'height') return vnodeStore.curVnode.height = parseInt(value);
        if (key == 'width') return vnodeStore.curVnode.width = parseInt(value);
        if (key == 'position') {
              if (value == 'relative') {
                    vnodeStore.curVnode.drag = false;
                    vnodeStore.curVnode.absoluteLeft = vnodeStore.curVnode.parent?.absoluteLeft || 0;
                    vnodeStore.curVnode.absoluteTop = vnodeStore.curVnode.parent?.absoluteTop || 0;
                    vnodeStore.curVnode.HTML!.style.left = '0px';
                    vnodeStore.curVnode.HTML!.style.top = '0px';
                    vnodeStore.curVnode.top = 0;
                    vnodeStore.curVnode.left = 0;
                    vnodeStore.curVnode.HTML!.style.cursor = 'default';
                    return;
              }
              vnodeStore.curVnode.drag = true;
              vnodeStore.curVnode.HTML!.style.cursor = 'move';
        }
        if (key == 'left') {
              let left = parseInt(value)
              vnodeStore.curVnode.left = left
              vnodeStore.curVnode.absoluteLeft = left
        }
        if (key == 'top') {
              let top = parseInt(value)
              vnodeStore.curVnode.top = top
              vnodeStore.curVnode.absoluteTop = top
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