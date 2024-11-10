<template>
    <div v-show="!!vnodeStore.curVnode && !!vnodeStore.curVnode.id" class="el" draggable="false"
        :style="{ top: elInforFinal.top, left: elInforFinal.left }">
        <!-- <div class="line rotate" :style="{ top: -30 + 'px', width: elInforFinal.width, height:0, left: '0px' }">
            <button @mousedown="updateDirection('rotate')"></button>
        </div> -->
        <div class="line top" :style="{ top: '-2px', width: elInforFinal.width, left: '0px' }">
            <button @mousedown="updateDirection('top')" :style="{cursor:!vnodeStore.curVnode?.drag? 'not-allowed' : 'ns-resize'}"></button>
            <div>{{ vnodeStore.curVnode?.name || '' }}</div>
        </div>
        <div class="line bottom" :style="{ top: elInforFinal.height, width: elInforFinal.width, left: '0px' }">
            <button @mousedown="updateDirection('bottom')" ></button>
            <div>W:{{ vnodeStore.curVnode?.width.toFixed(0) }}px,H:{{ vnodeStore.curVnode?.height.toFixed(0) }}px</div>
        </div>
        <div class="line left" :style="{ top: '0px', height: elInforFinal.height, left: '-2px' }">
            <button @mousedown="updateDirection('left')" :style="{cursor:!vnodeStore.curVnode?.drag? 'not-allowed' : 'ew-resize'}"></button>
        </div>
        <div class="line right" :style="{ top: '0px', height: elInforFinal.height, left: elInforFinal.width }">
            <button @mousedown="updateDirection('right')"></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import usePageStore from '@/store/usePageStore';
import useVnodeStore from '@/store/useVnodeStore';
import { DirectionType } from "@/types/OperateBorderLine"
import useOperate from "@/hooks/useOperate"
import useOperateRef from '@/hooks/useOperateRef.ts';
const vnodeStore = useVnodeStore();
const pageStore = usePageStore();
const operateRef=useOperateRef();
let elInforFinal = computed(() => {
    if (!vnodeStore.curVnode) return {
        top: 0,
        left: 0,
        width: 0,
        height: 0
    }
    return {
        top: operateRef.top.value-(1*pageStore.scale)+'px',
        left: operateRef.left.value-(1*pageStore.scale)+'px',
        width: (vnodeStore.curVnode.width + 2) * pageStore.scale + 'px',
        height: (vnodeStore.curVnode.height + 2) * pageStore.scale + 'px',
        rotate: '0px'
    }
})
watch(()=>vnodeStore.curVnode, () => {
    if(!vnodeStore.curVnode)return;
    let top=vnodeStore.curVnode.HTML!.getClientRects()[0].top-document.querySelector<HTMLDivElement>('.operateContent')!.getClientRects()[0].top;
    let left=vnodeStore.curVnode.HTML!.getClientRects()[0].left-document.querySelector<HTMLDivElement>('.operateContent')!.getClientRects()[0].left;
    operateRef.setTop(top)
    operateRef.setLeft(left)
})
const updateDirection = (direction: DirectionType) => {
    useOperate()(direction)
}

</script>

<style scoped lang="scss">
.el {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
}

.line {
    z-index: 10000;
    padding: 0;
    position: absolute;
    overflow: visible;
    display: flex;
    justify-content: center;
    align-items: center;
    --line-width: 2px;
    --line-color: rgb(255, 85, 198);
    user-select: none;
    button {
        padding: 0;
        -webkit-user-drag:none;
        min-width: 10px;
        min-height: 10px;
        border-radius: 2px;
        background-color: var(--line-color);
    }
    &.top {
        border-top: var(--line-color) var(--line-width) dashed;
        width: 100%;
        height: 0px;
        button {
            cursor: ns-resize;
        }
        div {
            position: absolute;
            top: -20px;
            left: 1px;
            font-size: 10px;
            background-color: rgb(255 0 169);
            border-radius: 3px;
            padding: 0 3px;
        }
    }
    &.bottom {
        border-bottom: var(--line-color) var(--line-width) dashed;
        width: 100%;
        height: 0px;
        position: relative;
        div {
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