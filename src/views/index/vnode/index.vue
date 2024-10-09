<template>
    <div class="contain">
        <CloseSquareOutlined
            style="color: white;font-size: 40px;cursor: pointer;position: absolute;top: 10px;right: 10px;z-index: 9;"
            ref="Openref" />
        <div ref="contain" class="contain-box" width="200" height="100"></div>
        <svg class="svg"></svg>
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import { nextTick, onUnmounted, Ref, ref } from 'vue';
import { VnodeDrag } from '@/hooks/useDrag';
import drawGrid from '@/utils/drawGrid';
import { onMounted } from 'vue';
import { CloseSquareOutlined } from '@ant-design/icons-vue'

import { getFn } from '@/utils/busEventFns';

const canvas = ref<HTMLCanvasElement>();
const contain = ref<HTMLDivElement>();
let unmnted: Function[] = [];
let resizeRender = () => {
    drawGrid(canvas as Ref<HTMLCanvasElement>);
}
const Openref = ref<HTMLDivElement>()
onMounted(() => {
    drawGrid(canvas as Ref<HTMLCanvasElement>);
    unmnted.push(VnodeDrag(contain as Ref<HTMLDivElement>));
    window.addEventListener('resize', resizeRender)
    nextTick(() => {
        Openref.value!.onclick = () => { getFn('openVnode')?.() }
    });
})

onUnmounted(() => {
    unmnted.forEach(fn => fn());
    window.removeEventListener('resize', resizeRender)
})
</script>

<style scoped>
.contain {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 2;
    color: black;
}

svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.contain-box {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
}
</style>