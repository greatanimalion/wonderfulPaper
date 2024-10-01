import { defineStore } from "pinia";
import { Vnode, plainVnode, VnodeOptions } from "@/types/Vnode";
import { VnodeInit } from "@/const/VnodeInit";
import { drawBezierCurveFromParent } from '@/utils/drawGrid';
import { creatUUID } from '@/utils/creatUUID';


class vnode {
    id: number;
    parent: Vnode | undefined;
    children: never[];
    top: number;
    left: number;
    width: number;
    style: string;
    height: number;
    type: string;
    events: {};
    text: string | undefined;
    lineToParent: any;
    constructor(options: VnodeOptions, parent: Vnode | undefined) {
        this.id = creatUUID();
        this.parent = parent
        this.children = []
        this.top = options.top || 0
        this.left = options.left || 0
        this.width = options.width || 0
        this.height = options.height || 0
        this.type = options.type || 'div'
        this.style = ''
        this.events = {}
        this.text = options.text
    }
    createVnode() {
        throw new Error('Method not implemented.');
    }
    createElement() {
        let ract = document.createElement('ract');
        ract.style.cssText = "fill: white; stroke: white; stroke-width: 2; fill-opacity: 0.8; stroke-opacity: 0.9;"
        ract.setAttribute('x', this.left.toString());
        ract.setAttribute('y', this.top.toString());
        ract.setAttribute('width', this.width.toString());
        ract.setAttribute('height', this.height.toString());
        document.querySelector('svg')?.appendChild(ract);
    }
}
let container: SVGSVGElement | null = null;
const VnodeStore1 = defineStore("VnodeStore", {
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
         * 渲染成真实节点
        */
        renderVnodeToNode(target: Vnode, type: 'add' | 'drag', color?: string) {
            if (type === 'add') {
                drawBezierCurveFromParent(target);
                if (!container) return;
                const div = document.createElement('div');
                div.setAttribute('id', target.id.toString());
                div.classList.add('vnode');
                div.style.cssText = `top:${target.top}px;left:${target.left}px;`;
                container.appendChild(div);
                return;
            }
            function traverse(target: Vnode) {
                if (target.parent)drawBezierCurveFromParent(target, color)
                target.children.forEach((v) => {
                    traverse(v)
                })
            }
            traverse(target)

        },
        /**
         * 创建子节点,同时渲染成真实dom节点
        */
        createSubVnode(parent: Vnode, options: VnodeOptions = {}) {
            let newVnode = new vnode(Object.assign({ ...VnodeInit }, options), parent)
            parent.children.push(newVnode)
            this.plainVnode.push(newVnode)
            this.renderVnodeToNode(newVnode, 'add')
        },
        setTarget(target: Vnode) {
            this.curVnode = target
        },
        clearTarget() {
            this.curVnode = null
        },
        /**
         * 初始化，创建根节点，同时渲染成真实dom节点
        */
        init() {
            container = document.querySelector('.contain-box');
            this.VnodeTree = new vnode(Object.assign({}, VnodeInit, { left: window.innerWidth / 2 }), undefined)
            this.renderVnodeToNode(this.VnodeTree, 'add')
            this.plainVnode.push(this.VnodeTree)
        }
    }
})
export default VnodeStore1;

