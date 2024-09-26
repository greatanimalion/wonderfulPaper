<template>
    <a-layout style="height: 100%;">
        <a-layout-sider style="background-color: var(--sideBGColor);">
            <div class="logo" ><span ref="logo">wonderful</span>Paper</div>
            <hr>
            <a-menu style="background-color: var(--sideBGColor);" mode="inline">
                <LSide></LSide>
            </a-menu> 
        </a-layout-sider>
        <a-layout >
            <a-layout-header style="background: #fff; padding:0;">
               <Tool></Tool>
            </a-layout-header>
            <a-layout-content :style="{ margin: '24px 16px', padding: '0px', background: '#fff', minHeight: '280px' }">
                <Content></Content>
            </a-layout-content>
        </a-layout><a-layout-sider class="siderStyle">
            <RSide></RSide>
        </a-layout-sider>
    </a-layout>
    <Vnode></Vnode>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import LSide from './Lside/index.vue';
import RSide from './Rside/index.vue';
import Content from './content/index.vue';
import colorFont from 'colorfontcolor';
import Tool from './tool/index.vue';
import Vnode from "./vnode/index.vue"
const logo=ref('logo')
onMounted(() => {
    colorFont(logo.value,{duration:3,color:['#a7a7a7','#9efb7d','#fb7def','#7dc0fb']}) 

})

</script>
<style scoped>
.logo {
    color: #a7a7a7;
    text-align: center;
    padding: 16px 0;
    font-size: 20px;
}

hr {
    border: 0.5px solid #444444;
}

.siderStyle {
    text-align: center;
    color: #fff;
    background-color: var(--sideBGColor);
    width: 100px
}

#components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
}

.site-layout .site-layout-background {
    background: #fff;
}

</style>