<template>
    <div class="contain">
        <div ref="contain" class="contain-box" width="200" height="100">
            
        </div>
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import { onUnmounted, Ref, ref } from 'vue';
import { VnodeDrag } from '@/hooks/useDrag';
import drawGrid from '@/utils/drawGrid';
import { onMounted } from 'vue';
import useVnodeStroe from '@/store/useVnodeStore'
const vnodeStore = useVnodeStroe()
const canvas = ref<HTMLCanvasElement>();
const contain = ref<HTMLDivElement>();

let unmnted:Function[]=[];
onMounted(() => {
    vnodeStore.init()
    drawGrid(canvas as Ref<HTMLCanvasElement>)
    unmnted.push(VnodeDrag(contain as Ref<HTMLDivElement>));
})

onUnmounted(() => {
    unmnted.forEach(fn => fn());
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
}

.contain-box {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
}

</style>