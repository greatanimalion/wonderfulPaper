<template>
    <div class="contain">
        <CloseSquareOutlined
            style="color: white;font-size: 40px;cursor: pointer;position: absolute;top: 10px;right: 10px;z-index: 9;"
            ref="Openref" @click="() => { pageStore.closeVnodePage() }" />
        <div ref="contain" class="contain-box" width="200" height="100"></div>
        <svg class="svg"></svg>
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import {  Ref, ref } from 'vue';
import { VnodeDrag } from '@/hooks/useDrag';
import drawGrid from '@/hooks/useDraw';
import { onMounted } from 'vue';
import { CloseSquareOutlined } from '@ant-design/icons-vue'
import usePageStore from '@/store/usePageStore';
const pageStore = usePageStore();
const canvas = ref<HTMLCanvasElement>();
const Openref = ref<HTMLDivElement>()
const contain = ref<HTMLDivElement>();
let resizeRender = () => {
    drawGrid(canvas as Ref<HTMLCanvasElement>);
}
onMounted(() => {
    drawGrid(canvas as Ref<HTMLCanvasElement>);
    VnodeDrag(contain as Ref<HTMLDivElement>)
    window.addEventListener('resize', resizeRender)
        pageStore.closeVnodePage()
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
    z-index: 10001;
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
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
}

</style>