function add<T,K extends keyof T>(obj: T, key: K): Promise<T> {
    console.log(obj[key]);
    return Promise.resolve(obj);
    
}
// Promise<T> 是告诉你 Promise 在 reslove 后返回的是 T 类型。


type myOmit<T,K extends keyof T> = {
    [key in Exclude<keyof T,K>]:T[key]
}
type myPartial<T> = {
    [key in keyof T]?:T[key]
}
type myRequired<T> = {
    [key in keyof T]-?:T[key]
}
type myReadonly<T> = {
    readonly [key in keyof T]:T[key]
}
type myPick<T,K extends keyof T> = {
    [key in K]:T[key]
}   
let a=100_100_00

type re<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
