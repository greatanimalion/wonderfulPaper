import { defineStore } from "pinia";
import { Vnode, plainVnode } from "@/types/Vnode";
import createVnode from "@/utils/createVnode";
import { VnodeInit } from "@/const/VnodeInit";
import { drawBezierCurveFromParent } from '@/utils/drawGrid';
const VnodeStore1 = defineStore("VnodeStore", {
    state: (): {
        plainVnode: plainVnode,
        VnodeTree: Vnode|null,
        curVnode:Vnode|null
    } => ({
        plainVnode: [],
        VnodeTree: null,
        curVnode:null
    }),
    actions: {
        findVnode(id:number){
            let index= this.plainVnode.findIndex((item)=>{
                    return item.id===id
            })
            return this.plainVnode[index]
        },
        renderVnodeToNode(target: Vnode, type: 'add' | 'drag') {
            if (type === 'add') {
                drawBezierCurveFromParent(target);
            }
            else {
                function traverse(target: Vnode) {
                    if (target.parent) drawBezierCurveFromParent(target)
                    target.children.forEach((v) => {
                        traverse(v)
                    })
                }
                traverse(target)
            }
        },
        addVnode(parent: Vnode) {
            createVnode(Object.assign({ ...VnodeInit }, { top: parent.top + parent.height }), parent)
        },
        setTarget(target:Vnode){
            this.curVnode=target
       },
       clearTarget(){
        this.curVnode=null
       },
       init(){
        this.VnodeTree=createVnode(Object.assign({}, VnodeInit))
       }
    }
})
export default VnodeStore1;