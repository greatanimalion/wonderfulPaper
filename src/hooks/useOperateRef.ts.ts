import { Ref, ref } from "vue";
import usePageStore from "@/store/usePageStore";
const top = ref(0);
const left = ref(0);
//操作框的实时位置
const realObj = {
    left: 0,
    top: 0
}
let operate: {
    top: Ref<number>,//虚拟坐标系的top
    left: Ref<number>,//虚拟坐标系的left
    realObj: {
        top: number,//物理坐标系的top
        left: number,//物理坐标系的top
    }

    setTop: (value: number) => void,
    setLeft: (value: number) => void
    scale: (zoom: number) => void
    setRealLeft: (left: number) => void
    setRealTop: (top: number) => void
};

export default function useOperateRef() {
    /**
     * 输入虚拟坐标系的top
    */
    const setTop = (value: number) => {
        top.value = value;
        realObj.top = value / usePageStore().scale;
    }
    /**
     * 输入虚拟坐标系的left
    */
    const setLeft = (value: number) => {
        left.value = value;
        realObj.left = value / usePageStore().scale;
    }
    /**
     * 输入物理坐标系的left
    */
    const setRealLeft = (l: number) => {
        realObj.left = l;
        left.value = l * usePageStore().scale;
    }
    /**
     * 输入物理坐标系的top
    */
    const setRealTop = (t: number) => {
        realObj.top = t;
        top.value = t * usePageStore().scale;
    }
    /**
     * 输入页面放缩比例
    */
    const scale = (zoom: number) => {
        top.value = realObj.top * zoom;
        left.value = realObj.left * zoom;
    }
    operate = operate || {
        realObj,
        top,
        left,
        setTop,
        setLeft,
        scale,
        setRealLeft,
        setRealTop
    }
    return operate;
}