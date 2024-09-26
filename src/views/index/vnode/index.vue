<template>
    <div  class="contain">
        <svg ref="contain"  width="200" height="100">
            <rect id="draggableRect" x="30" y="20" width="50" height="30"
                style="fill:blue;stroke:pink;stroke-width:2;fill-opacity:0.1;stroke-opacity:0.9" />
            <text>Hello World</text>
        </svg>

    </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { VnodeDrag } from '@/hooks/useDrag';
 import { elementFromPoint } from '@/utils/elementFromPoint';
const contain = ref<HTMLDivElement>();
const vnodeDrag =  VnodeDrag(contain as Ref<HTMLDivElement>);
const Vnode=vnodeDrag()
elementFromPoint(contain as Ref<HTMLDivElement>,Vnode.setNew)
</script>

<style scoped>
.contain {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2;
}
svg{
    width: 100%;
    height: 100%;
}
</style>