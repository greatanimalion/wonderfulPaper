import { defineStore } from "pinia";
import { Vnode, plainVnode, VnodeOptions } from "@/types/Vnode";
import usePageStore from "./usePageStore";
import createVnode from "@/utils/vnode/createVnode";
/**
 * @param target 传递遍历的节点,必须存在target.children且为数组
 * @param callBack 回调函数
 * 先序遍历调用回调函数
*/
function traverse<T extends { children: T[] }>(target: T, callBack: Function) {
    callBack(target)
    target.children.forEach((v) => {
        traverse(v, callBack)
    })
}
const VnodeStore = defineStore("useVnodeStore", {
    state: (): {
        plainVnode: plainVnode,
        VnodeTree: Vnode | null,
        curVnode: Vnode | null,

    } => ({
        plainVnode: [],
        VnodeTree: null,
        curVnode: null
    }),
    actions: {
        findVnode(id: number) {
            let index = this.plainVnode.findIndex((item) => { return item.id === id })
            return this.plainVnode[index]
        },
        /**
         * 创建子节点,同时渲染成真实dom节点
        */
        createSubVnode(parent: Vnode | null, options: VnodeOptions = {}) {
            if(!!!options.type)return 
            if (!parent) parent = this.VnodeTree!
            if(!usePageStore().vnodePage){
                length=parent.children.length;
                options.vTop=parent.vTop+80;
                options.vLeft=parent.children[length-1]?.vLeft+100||parent.vLeft;
            }
            let newVnode = createVnode(options)
            parent.children.push(newVnode)
            this.plainVnode.push(newVnode)
        },
        setTarget(target: Vnode) {
            this.curVnode = target
        },
        clearTarget() {
            this.curVnode = null
        },
        /**
         * 更新节点属性
         * @param target 目标节点
         * @param options 新属性
         * 仅更新节点的位置，宽高，样式属性，不改变解节点的事件等，不涉及虚拟节点dom的改变
        */
        updataVnode(target: Vnode, options: Omit<VnodeOptions, 'events' | 'lineToParent' | 'HTML' | 'vHTML' | 'vTop' | 'vLeft'>) {
            ['top', 'left', 'width', 'height', 'style', 'type', 'text'].forEach((key) => {
                //@ts-ignore
                target[key] = options[key] || target[key]
            })
        },
        /**
         * 初始化，创建根节点，同时渲染成节点
        */
        init() {
            this.VnodeTree = createVnode({name:'根节点'})
            this.plainVnode.push(this.VnodeTree)
        },
        deleteVnode() {
            let vnode = this.curVnode!
            this.plainVnode.splice(this.plainVnode.indexOf(vnode), 1)
            vnode.parent?.children.splice(vnode.parent.children.indexOf(vnode), 1)
            traverse(vnode, (e: Vnode) => {
                e.lineToParent?.remove()
                e.HTML?.remove()
                e.vHTML?.remove()
            })
            this.clearTarget()
        }
    }
})
export default VnodeStore;

