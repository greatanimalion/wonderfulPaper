import { Action } from "@/types/RevocationAndReinstatement"

//撤销栈
let revocationStack : Action[]=[]
//恢复栈
let reinstatementStack : Action[]=[]
/**
 * @description: 撤销某个操作，并将其加入恢复栈中
*/
function revocation(pageId:number) {
    let index=revocationStack.findLastIndex(action=>action.pageId===pageId);
    if(index===-1) return;
    let action = revocationStack.splice(index,1)[0];
    action.revocation();
    reinstatementStack.push(action);
}
/**
 * @description: 恢复某个操作，并将其加入撤销栈中
*/
function reinstatement(pageId:number) {
    let index=reinstatementStack.findLastIndex(action=>action.pageId===pageId);
    if(index===-1) return;
    let action = reinstatementStack.splice(index,1)[0];
    action.reinstatement();
    revocationStack.push(action);
}
/**
 * @description: 执行某个操作，并将其加入撤销栈中
 * @param {any} action 要执行的操作
*/
function doThing(action:Action){
    revocationStack.push(action);
    if(revocationStack.length>35){
        revocationStack.shift();
    }
}


/**
 * @param {string} pageId 要删除的页面ID
 * @description: 删除某个页面时，将所有栈中的操作都删除
*/
function deletePage(pageId:number){
    revocationStack = revocationStack.filter(action=>action.pageId!==pageId)
    reinstatementStack = reinstatementStack.filter(action=>action.pageId!==pageId)
}
export default {
    doThing,
    revocation,
    reinstatement,
    deletePage
}