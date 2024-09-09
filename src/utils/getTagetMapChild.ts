import { SubElement } from "@/types/element";
export  function getTagetMapChild(tagetMap: Map<number,SubElement>, id: number) {
    for(let [key,value] of tagetMap){
        if(id===key)return value
        else if(value.children.size!==0){
            return getTagetMapChild(value.children,id)
        }
    }
}
export  function deleteTagetMapChild(tagetMap: Map<number,SubElement>, id: number) {
    for(let [key,value] of tagetMap){
        if(id===key){
            tagetMap.delete(key)
            return}
        else if(value.children.size!==0){
            return getTagetMapChild(value.children,id)
        }
    }
}
