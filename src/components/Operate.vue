<template>
    <div v-show="!!elInfor.el" class="el" :style="{ top: elInforFinal.top, left: elInforFinal.left }">
        <div class="rotate"></div>
        <div class="line top" :style="{ top: -2 + 'px', width: elInforFinal.width, left: '0px' }">
            <button class="btn" style="cursor:ns-resize"></button>
        </div>
        <div class="line buttom" :style="{ top: elInforFinal.height, width: elInforFinal.width, left: '0px' }">
            <button class="btn" style="cursor:ns-resize"></button>
        </div>
        <div class="line left" :style="{ top: '0px', height: elInforFinal.height, left: -2 + 'px' }">
            <button class="btn" style="cursor:ew-resize"></button>
        </div>
        <div class="line right" :style="{ top: '0px', height: elInforFinal.height, left: elInforFinal.width }">
            <button class="btn" style="cursor:ew-resize"></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch, watchEffect } from 'vue';
import usePageStore from '@/store/usePageStore';
import useVnodeStore from '@/store/useVnodeStore';
const vnodeStore = useVnodeStore();
const pageStore = usePageStore();
type ElInfor = {
    el: HTMLElement | undefined;
    top: number;
    left: number;
    width: number;
    height: number;
    rotate: number;
}
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
    elInfor.top = curVnode.parent!.absoluteTop+curVnode.top;
    elInfor.left = curVnode.parent!.absoluteLeft+curVnode.left;
    elInfor.width = curVnode.width;
    elInfor.height = curVnode.height;
})


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
        border-top: 1px var(--line-color) dashed;
        width: 100%;
        height: var(--line-width);
    }

    &.buttom {
        border-bottom: 1px var(--line-color) dashed;
        width: 100%;
        height: var(--line-width);
    }

    &.left {
        border-left: 1px var(--line-color) dashed;
        height: 100%;
        width: var(--line-width);
    }

    &.right {
        border-right: 1px var(--line-color) dashed;
        height: 100%;
        width: var(--line-width);
    }
}
</style>