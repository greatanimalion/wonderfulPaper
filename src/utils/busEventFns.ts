const busEventFns = new Map<string, ()=>void>();


export function setFn(name: string, fn: ()=>void){
    busEventFns.set(name, fn);
}
export function getFn(name: string): (()=>void)|undefined{
    return busEventFns.get(name);
}
export function deleteFn(name: string){
    busEventFns.delete(name);
}