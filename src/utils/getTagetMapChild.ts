import { SubElement } from "@/types/element";
export function getTagetMapChild(targetMap: Map<number, SubElement>, id: number): SubElement | undefined {
    for (let [key, value] of targetMap) {
        if (id === key) return value
        else if (value.children.size !== 0) {
            let target = getTagetMapChild(value.children, id)
            if (target) return target
        }
    }
}
export function deleteTagetMapChild(tagetMap: Map<number, SubElement>, id: number) {
    for (let [key, value] of tagetMap) {
        if (id === key) {
            tagetMap.delete(key)
            return
        }
        else if (value.children.size !== 0) {
            getTagetMapChild(value.children, id)
        }
    }
}
