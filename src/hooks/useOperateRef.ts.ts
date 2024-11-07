import { Ref, ref } from "vue";
const top = ref(0);
const left = ref(0);
let operate:{
    top:Ref<number>,
    left:Ref<number>,
    setTop:(value:number)=>void,
    setLeft:(value:number)=>void
};
export default function useOperateRef() {
    const setTop = (value: number) => {
        top.value = value;
    }
    const setLeft = (value: number) => {
        left.value = value;
    }
    operate=operate||{
        top,
        left,
        setTop,
        setLeft
    }
    return operate;
}