import { defineStore } from "pinia";
import { Vnode, plainVnode, VnodeOptions } from "@/types/Vnode";
import { VnodeInit } from "@/const/VnodeInit";
import { drawBezierCurveFromParent } from '@/hooks/useDraw';
import { creatUUID } from '@/utils/creatUUID';
import useElementStyleStore from "./useElementStyleStore";
import { ElementType } from "@/const/elementType";
import usePageStore from "./usePageStore";
let elementStyleStore
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
class vnode implements Vnode {
    id: number;
    parent: Vnode | undefined;
    children: never[];
    top: number;//与style的top一致，但出于性能考虑，单独设置
    left: number;//与style的left一致，但出于性能考虑，单独设置
    width: number;//与style的width一致，但出于性能考虑，单独设置
    height: number;//与style的height一致，但出于性能考虑，单独设置
    style: string;
    type: ElementType;
    events: {};
    lineToParent: any;
    HTML: HTMLElement | null;
    vHTML: HTMLElement | null;
    absoluteTop: number;
    absoluteLeft: number;
    vTop: number;
    vLeft: number;
    vWidth: number;
    vHeight: number;
    name: string;
    drag: boolean;
    constructor(options: VnodeOptions, parent: Vnode | undefined) {
        elementStyleStore = useElementStyleStore()
        this.id = creatUUID();
        this.parent = parent
        this.children = []
        this.vTop = options.vTop || 0
        this.vLeft = options.vLeft || 0
        this.vWidth = options.vWidth || 0
        this.vHeight = options.vHeight || 0
        this.top = options.top || 0
        this.left = options.left || 0
        this.width = options.width || 0
        this.height = options.height || 0
        this.type = options.type||'div'
        this.style = elementStyleStore.getCommonElementStyle(this.type) || ''
        this.events = {}
        this.vHTML = null
        this.absoluteTop = this.parent?.absoluteTop || 0
        this.absoluteLeft = this.parent?.absoluteLeft || 0
        this.name = options.name || ''
        this.drag = true
        if (this.id == 0) this.HTML = document.querySelector('.content')!.firstChild as HTMLDivElement
        else this.HTML = this.createHTML()
    }
    // 创建html
    createHTML() {
        let vnode = this
        let element = document.createElement(vnode.type)
        vnode.HTML = element
        element.id = "el" + vnode.id.toString()
        element.style.cssText = vnode.style
        element.style.top = vnode.top + 'px'
        element.style.left = vnode.left + 'px'
        element.style.width = vnode.width + 'px'
        element.style.height = vnode.height + 'px'
        element.style.position = vnode.parent?.drag ? 'absolute' : 'relative'
        element.style.top = '0px'
        element.style.left = '0px'
        if(vnode.type=='input')element.setAttribute('autocomplete','off')
        vnode.parent?.HTML?.appendChild(element)
        return element
    }
    //创建虚拟节点真实节点
    renderVnodeToNode(type: 'add' | 'drag', color?: string) {
        let target = this
        drawBezierCurveFromParent(target);
        if (type === 'add') {
            if (!container) return;
            const div = document.createElement('div');
            div.setAttribute('id', target.id.toString());
            div.classList.add('vnode');
            div.style.cssText = `top:${target.vTop}px;left:${target.vLeft}px;`;
            div.innerText = target.name || target.id.toString();
            container.appendChild(div);
            target.vHTML = div
            return;
        }
        target.children.forEach((v) => {
            drawBezierCurveFromParent(v, color)
        })
    }
}

let container: SVGSVGElement | null = null;
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
            let newVnode = new vnode(Object.assign({ ...VnodeInit }, options), parent)
            parent.children.push(newVnode)
            this.plainVnode.push(newVnode)
            newVnode.renderVnodeToNode('add')
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
            container = document.querySelector('.contain-box');
            //@ts-ignore
            this.VnodeTree = new vnode(Object.assign({}, VnodeInit, { left: window.innerWidth / 2, type: 'div' }), undefined)
            this.VnodeTree.renderVnodeToNode('add')
            this.plainVnode.push(this.VnodeTree)
        },
        deleteVnode() {
            let vnode = this.curVnode!
            this.plainVnode.splice(this.plainVnode.indexOf(vnode), 1)
            vnode.parent?.children.splice(vnode.parent.children.indexOf(vnode), 1)
            vnode.parent?.renderVnodeToNode('add')
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

