<template>
    <div v-show="!!elInfor.el" class="el" :style="{top:elInfor.top+'px',left:elInfor.left+'px'}">
        <div class="rotate"></div>
        <div class="line top"    :style="{top:-3+'px',width:elInfor.width+'px',left:'0px'}">
            <button class="btn" style="cursor:ns-resize"></button>
        </div>
        <div class="line buttom" :style="{top:elInfor.height+'px',width:elInfor.width+'px',left:'0px'}">
            <button class="btn" style="cursor:ns-resize"></button>
        </div>
        <div class="line left"   :style="{top:'0px',height:elInfor.height+'px',left:-2+'px'}">
            <button class="btn" style="cursor:ew-resize"></button>
        </div>
        <div class="line right"  :style="{top:'0px',height:elInfor.height+'px',left:elInfor.width+'px'}">
            <button class="btn" style="cursor:ew-resize"></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
type ElInfor = {
    el: HTMLElement|undefined;
    top: number;
    left: number;
    width: number;
    height: number;
    rotate: number;
}
const elInfor=reactive<ElInfor>({
    el: undefined,
    top:0,
    left:0,
    width:0,
    height:0,
    rotate:0
})

watch(()=>elInfor.el, () => {
    if(!elInfor.el)return ;
    const rect = getComputedStyle(elInfor.el);
    elInfor.top = +elInfor.el.style.top.replace('px', '');
    elInfor.left = +elInfor.el.style.left.replace('px', '');
    elInfor.width = +rect.width.replace('px', '');
    elInfor.height = +rect.height.replace('px', '');
})
watch(()=>elInfor.height, () => {
    console.log(elInfor);
    
})
defineExpose({elInfor})
</script>

<style scoped>

button {
    padding: 0;
    min-width: 10px;
    min-height: 10px;
    border-radius: 2px;
    background-color:var(--line-color);
}
.el{
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