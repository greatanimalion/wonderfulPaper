<template>
    <div v-show="!!target.el" class="el">
        <div class="rotate"></div>
        <div class="line top"    :style="{top:elInfor.top-2+'px',width:elInfor.width+'px',left:elInfor.left+'px'}">
            <button class="btn" style="cursor:ns-resize"></button>
        </div>
        <div class="line buttom" :style="{top:elInfor.top+elInfor.height+'px',width:elInfor.width+'px',left:elInfor.left+'px'}">
            <button class="btn" style="cursor:ns-resize"></button>
        </div>
        <div class="line left"   :style="{top:elInfor.top+'px',height:elInfor.height+'px',left:elInfor.left-2+'px'}">
            <button class="btn" style="cursor:ew-resize"></button>
        </div>
        <div class="line right"  :style="{top:elInfor.top+'px',height:elInfor.height+'px',left:elInfor.left+elInfor.width+'px'}">
            <button class="btn" style="cursor:ew-resize"></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
const elInfor=reactive({
    top:0,
    left:0,
    width:0,
    height:0,
    rotate:0
})
const { target } = defineProps<{ target: { el: HTMLElement|undefined } }>();
watch(()=>target.el, () => {
    if(!target.el)return ;
    const rect = getComputedStyle(target.el);
    elInfor.top = +target.el.style.top.replace('px', '');
    elInfor.left = +target.el.style.left.replace('px', '');
    elInfor.width = +rect.width.replace('px', '');
    elInfor.height = +rect.height.replace('px', '');
    console.log(elInfor);
    
})

</script>

<style scoped>

button {
    padding: 0;
    min-width: 10px;
    min-height: 10px;
    border-radius: 2px;
    background-color:var(--line-color);
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