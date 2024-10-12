<template>
    <div v-show="!!elInfor.el" class="el" :style="{ top: elInforFinal.top, left: elInforFinal.left }">
        <div class="rotate"></div>
        <div class="line top" :style="{ top: -2 + 'px', width: elInforFinal.width, left: '0px' }">
            <button @mousedown="updateDirection('top')" class="btn" style="cursor:ns-resize"></button>
        </div>
        <div class="line bottom" :style="{ top: elInforFinal.height, width: elInforFinal.width, left: '0px' }">
            <button  @mousedown="updateDirection('bottom')"  class="btn" style="cursor:ns-resize"></button>
        </div>
        <div class="line left" :style="{ top: '0px', height: elInforFinal.height, left: -2 + 'px' }">
            <button  @mousedown="updateDirection('left')" class="btn" style="cursor:ew-resize"></button>
        </div>
        <div class="line right" :style="{ top: '0px', height: elInforFinal.height, left: elInforFinal.width }">
            <button  @mousedown="updateDirection('right')" class="btn" style="cursor:ew-resize"></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, watchEffect} from 'vue';
import usePageStore from '@/store/usePageStore';
import useVnodeStore from '@/store/useVnodeStore';
import  { ElInfor, DirectionType} from "@/types/OperateBorderLine"
import useOperate from "@/hooks/useOperate"
const vnodeStore = useVnodeStore();
const pageStore = usePageStore();

const elInfor = reactive<ElInfor>({
    el: undefined,
    top: 0,
    left: 0,
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

watchEffect(() => {
    if (!elInfor.el) return;
    let curVnode = vnodeStore.curVnode;
    if (!curVnode) return
    elInfor.top = curVnode.parent!.absoluteTop + curVnode.top;
    elInfor.left = curVnode.parent!.absoluteLeft + curVnode.left;
    elInfor.width = curVnode.width;
    elInfor.height = curVnode.height;
})
const updateDirection = (direction:DirectionType ) => {
    useOperate(elInfor)(direction)
}

defineExpose({ elInfor })
</script>

<style scoped>
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
    &.top {
        border-top: var(--line-color) var(--line-width) dashed;
        width: 100%;
        height: 0px;
    }

    &.bottom {
        border-bottom: var(--line-color) var(--line-width) dashed;
        width: 100%;
        height: 0px;
    }

    &.left {
        border-left: var(--line-color) var(--line-width) dashed;
        height: 100%;
        width: 0px;
    }

    &.right {
        border-right: var(--line-color) var(--line-width) dashed;
        height: 100%;
        width: 0px;
    }
}
</style>