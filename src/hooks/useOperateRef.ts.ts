import { Ref, ref } from "vue";
import usePageStore from "@/store/usePageStore";
const top = ref(0);
const left = ref(0);
let realLeft = 0;
let realTop = 0;
let operate: {
    top: Ref<number>,//虚拟坐标系的top
    left: Ref<number>,//虚拟坐标系的left
    realTop: number,//物理坐标系的top
    realLeft: number,//物理坐标系的top
    setTop: (value: number) => void,
    setLeft: (value: number) => void
    scale: (zoom: number) => void
};

/**
 * 已自动处理，只需填入真实物理像素即可
*/
export default function useOperateRef() {
    const setTop = (value: number) => {
        top.value = value;
        realTop =value/usePageStore().scale;
    }
    const setLeft = (value: number) => {
        left.value = value;
        realLeft =value/usePageStore().scale;
        console.log(usePageStore().scale);
        
    }
    /**
     * 专门为页面放缩管理
    */
    const scale = (zoom: number) => {
        top.value = realTop*zoom;
        left.value = realLeft*zoom;
    }
    operate = operate || {
        realLeft,
        realTop,
        top,
        left,
        setTop,
        setLeft,
        scale
    }
    return operate;
}