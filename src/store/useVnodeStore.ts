import { defineStore } from "pinia";
import { Vnode, plainVnode, VnodeOptions } from "@/types/Vnode";
import { VnodeInit } from "@/const/VnodeInit";
import { drawBezierCurveFromParent } from '@/utils/drawGrid';
import { creatUUID } from '@/utils/creatUUID';
import useElementStyleStore from "./useElementStyleStore";
import { ElementType } from "@/const/elementType";
let elementStyleStore
/**
 * @param target 传递遍历的节点,必须存在target.children且为数组
 * @param callBack 回调函数
 * 先序遍历调用回调函数
*/
function traverse<T extends { children: T[] }>(target:T ,callBack: Function) {
    target.children.forEach((v) => {
        callBack(v)
        traverse(v,callBack)
    })
}
class vnode {
    id: number;
    parent: Vnode | undefined;
    children: never[];
    top: number;
    left: number;
    width: number;
    style: string;
    height: number;
    type: ElementType;
    events: {};
    text: string | undefined;
    lineToParent: any;
    HTML: HTMLElement | null;
    vHTML: HTMLElement | null;
    constructor(options: VnodeOptions, parent: Vnode | undefined) {
        elementStyleStore = useElementStyleStore()
        this.id = creatUUID();
        this.parent = parent
        this.children = []
        this.top = options.top || 0
        this.left = options.left || 0
        this.width = options.width || 0
        this.height = options.height || 0
        this.type = options.type || 'div'
        this.style = elementStyleStore.getCommonElementStyle(this.type) || ''
        this.events = {}
        this.text = options.text
        this.vHTML = null
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
        element.style.position = 'absolute'
        element.style.top = 0 + 'px'
        element.style.left = 0 + 'px'
        vnode.parent?.HTML?.appendChild(element)
        return element
    }
    //创建真实节点
    renderVnodeToNode(type: 'add' | 'drag', color?: string) {
        let target = this
        if (type === 'add') {
            drawBezierCurveFromParent(target,color);
            if (!container) return;
            const div = document.createElement('div');
            div.setAttribute('id', target.id.toString());
            div.classList.add('vnode');
            div.style.cssText = `top:${target.top}px;left:${target.left}px;`;
            div.innerText = target.text || target.id.toString();
            container.appendChild(div);
            target.vHTML = div
            return;
        }
        // traverse<Vnode>(target.parent!, (e:Vnode) => {
        //     if (e)drawBezierCurveFromParent(e, color)
        // })
        else {
            drawBezierCurveFromParent(target);
            target.children.forEach((v) => {
                drawBezierCurveFromParent(v,color)
            })
        }
    }
}

let container: SVGSVGElement | null = null;
const VnodeStore = defineStore("VnodeStore", {
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
        createSubVnode(parent: Vnode, options: VnodeOptions = {}) {
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
            vnode.parent?.renderVnodeToNode('add', 'rgba(255, 0, 0, 0.5)')
            vnode.HTML?.remove()
            vnode.vHTML?.remove()
            vnode.lineToParent?.remove()
        }
    }
})
export default VnodeStore;

