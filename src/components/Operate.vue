<template>
    <div v-show="!!target.el" class="el">
        <div class="rotate"></div>
        <div class="line top"    :style="{top:elInfor.top+'px',width:elInfor.width+'px',left:elInfor.left+'px'}   "><button class="btn"></button></div>
        <div class="line buttom" :style="{top:elInfor.top+elInfor.height+'px',width:elInfor.width+'px',left:elInfor.left+'px'}"><button class="btn"></button></div>
        <div class="line left"   :style="{top:elInfor.top+'px',height:elInfor.height+'px',left:elInfor.left+'px'}"><button class="btn" ></button></div>
        <div class="line right"  :style="{top:elInfor.top+'px',height:elInfor.height+'px',left:elInfor.left+elInfor.width+'px'}"><button class="btn"></button></div>
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
    width: 5px;
    height: 5px;
    border-radius: 40%;
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
   
    &.top {
        border-top: 1px var(--line-color) dashed;
        width: 100%;
        height: 1px;
    }

    &.buttom {
        border-bottom: 1px var(--line-color) dashed;
        width: 100%;
        height: 1px;
    }

    &.left {
        border-left: 1px var(--line-color) dashed;
        height: 100%;
        width: 1px;
    }

    &.right {
        border-right: 1px var(--line-color) dashed;
        height: 100%;
        width: 1px;
    }
}
</style>