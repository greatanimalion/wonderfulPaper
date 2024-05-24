export function creatUUID():number{
    return Date.now()
}
export function creatUUIDToString():string{
    return creatUUID().toString()
}