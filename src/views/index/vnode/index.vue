<template>
    <div class="contain">
        <svg ref="contain" width="200" height="100">
            <rect id="draggableRect" x="500" y="100" width="100" height="50"
                style="fill:white;stroke:white;stroke-width:2;fill-opacity:0.8;stroke-opacity:0.9" rx="5" ry="5"
                />
                <rect id="draggableRect" x="700" y="100" width="100" height="50"
                style="fill:white;stroke:white;stroke-width:2;fill-opacity:0.8;stroke-opacity:0.9" rx="5" ry="5"
                />
                <rect id="draggableRect" x="500" y="200" width="100" height="50"
                style="fill:white;stroke:white;stroke-width:2;fill-opacity:0.8;stroke-opacity:0.9" rx="5" ry="5"
                />
        </svg>
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { VnodeDrag } from '@/hooks/useDrag';
import { elementFromPoint } from '@/utils/elementFromPoint';
import drawGrid from '@/utils/drawGrid';
const canvas = ref<HTMLCanvasElement>();
const contain = ref<HTMLDivElement>();
drawGrid(canvas as Ref<HTMLCanvasElement>)
const vnodeDrag = VnodeDrag(contain as Ref<HTMLDivElement>);
const Vnode = vnodeDrag()
elementFromPoint(contain as Ref<HTMLDivElement>, Vnode.setNew)

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

svg {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
}
</style>