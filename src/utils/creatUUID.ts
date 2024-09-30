let _id=0
export function creatUUID():number{
    return ++_id
}
export function creatUUIDToString():string{
    return creatUUID().toString()
}