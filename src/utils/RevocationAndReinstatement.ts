import { Action } from "@/types/RevocationAndReinstatement"

//撤销栈
let revocationStack : Action[]=[]
//恢复栈
let reinstatementStack : Action[]=[]
/**
 * @description: 撤销某个操作，并将其加入恢复栈中
*/
function revocation() {
    let action = revocationStack.pop() as Action
    if(!action) return

    
    action.revocation()
    reinstatementStack.push(action)
}
/**
 * @description: 恢复某个操作，并将其加入撤销栈中
*/
function reinstatement() {
    let action =reinstatementStack.pop()!
    if(!action) return
    action.reinstatement()
    revocationStack.push(action)
}
/**
 * @description: 执行某个操作，并将其加入撤销栈中
 * @param {any} action 要执行的操作
*/
function doThing(action:Action){
    revocationStack.push(action)
    if(revocationStack.length>15){
        revocationStack.shift()
    }
}

// function merge(action:Action){
//     switch(action.type=='CREATE_ELEMENT'){
        
//     }
// }

export default {
    doThing,
    revocation,
    reinstatement
}