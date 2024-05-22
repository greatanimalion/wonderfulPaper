<template>
    <div ref="baseElementList" style="height: 100%;width: 100%;">
        <a-layout>
            <a-layout-sider :trigger="null">
                <div class="logo">wonderfulPaper</div>
                <hr>
                <a-menu theme="dark" mode="inline">
                    <LSide></LSide>
                </a-menu>
            </a-layout-sider>
            <a-layout>
                <a-layout-header style="background: #fff; padding:0 10px"> kejian1</a-layout-header>
                <a-layout-content
                    :style="{ margin: '24px 16px', padding: '0px', background: '#fff', minHeight: '280px' }">
                    <Content></Content>
                </a-layout-content>
            </a-layout><a-layout-sider class="siderStyle">
                <RSide></RSide>
            </a-layout-sider>
        </a-layout>
    </div>
</template>
<script lang="ts" setup>
import LSide from './lSide.vue';
import RSide from './rSide.vue';
import Content from './content.vue';
import { ref,onMounted } from 'vue';
const baseElementList = ref(null);
onMounted(() => {
    (baseElementList?.value as any).ondragstart = (e:any) => {e.dataTransfer.effectAllowed = "copy";  console.log('start',e);}
    // (baseElementList?.value as any).ondragover = (e:any) => {  console.log("over",e.target);}
    // (baseElementList?.value as any).ondragenter = (e:any) => {  console.log("drop",e.target);}
     (baseElementList?.value as any).ondrop = (e:any) => {  console.log("drop",e.target);}
});
</script>
<style scoped>
.logo {
    color: #fff;
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
    background-color: #041427;
    width: 100px
}

.css-dev-only-do-not-override-16pw25h {
    height: 100%;

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