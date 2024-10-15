<template>
    <div v-show="!!elInfor.el" class="el" :style="{ top: elInforFinal.top, left: elInforFinal.left }">
        <div class="rotate"></div>
        <div class="line top" :style="{ top: -2 + 'px', width: elInforFinal.width, left: '0px' }">
            <button @mousedown="updateDirection('top')"></button>
        </div>
        <div class="line bottom" :style="{ top: elInforFinal.height, width: elInforFinal.width, left: '0px' }">
            <button @mousedown="updateDirection('bottom')"></button> 
            <div>W:{{elInfor.width.toFixed(0)}}px,H:{{elInfor.height.toFixed(0)}}px</div>
        </div>
        <div class="line left" :style="{ top: '0px', height: elInforFinal.height, left: -2 + 'px' }">
            <button @mousedown="updateDirection('left')"></button>
        </div>
        <div class="line right" :style="{ top: '0px', height: elInforFinal.height, left: elInforFinal.width }">
            <button @mousedown="updateDirection('right')"></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch, watchEffect } from 'vue';
import usePageStore from '@/store/usePageStore';
import useVnodeStore from '@/store/useVnodeStore';
import { ElInfor, DirectionType } from "@/types/OperateBorderLine"
import useOperate from "@/hooks/useOperate"
const vnodeStore = useVnodeStore();
const pageStore = usePageStore();

const elInfor = reactive<ElInfor>({
    el: undefined,//被拖动的元素
    top: 0,//本组件的高
    left: 0,//本组件的宽
    width: 0,
    height: 0,
    rotate: 0
})


let elInforFinal = computed(() => ({
    top: elInfor.top * pageStore.scale + 'px',
    left: elInfor.left * pageStore.scale + 'px',
    width: elInfor.width * pageStore.scale + 'px',
    height: elInfor.height * pageStore.scale + 'px',
    rotate: elInfor.rotate * pageStore.scale + 'px'
}))

watch(()=>elInfor.el,() => {
    if (!elInfor.el&&!vnodeStore.curVnode) return;
    let curVnode = vnodeStore.curVnode;
    if (!curVnode) return
    elInfor.top = curVnode.parent!.absoluteTop + curVnode.top;
    elInfor.left = curVnode.parent!.absoluteLeft + curVnode.left;
    elInfor.width = curVnode.width;
    elInfor.height = curVnode.height;
})
const updateDirection = (direction: DirectionType) => {
    useOperate(elInfor)(direction)
}

defineExpose({ elInfor })
</script>

<style scoped lang="scss">
button {
    padding: 0;
    min-width: 10px;
    min-height: 10px;
    border-radius: 2px;
    background-color: var(--line-color);
}

.el {
    position: absolute;
    top: 0;
}

.line {
    z-index: 1;
    padding: 0;
    position: absolute;
    overflow: visible;
    display: flex;
    justify-content: center;
    align-items: center;
    --line-width: 2px;
    --line-color: rgb(255, 85, 198);

    &.top {
        border-top: var(--line-color) var(--line-width) dashed;
        width: 100%;
        height: 0px;

        button {
            cursor: ns-resize;
        }
    }

    &.bottom {
        border-bottom: var(--line-color) var(--line-width) dashed;
        width: 100%;
        height: 0px;
        position: relative;
        div{
            position: absolute;
            top: 3px;
            left: 1px;
            font-size: 10px;
            background-color: rgb(255 0 169);
            border-radius: 3px;
            padding: 0 3px;
        }
        button {
            cursor: ns-resize;
        }
    }

    &.left {
        border-left: var(--line-color) var(--line-width) dashed;
        height: 100%;
        width: 0px;
        button {
            cursor: ew-resize;
        }

    }

    &.right {
        border-right: var(--line-color) var(--line-width) dashed;
        height: 100%;
        width: 0px;
        button {
            cursor: ew-resize;
        }
    }
}
</style>