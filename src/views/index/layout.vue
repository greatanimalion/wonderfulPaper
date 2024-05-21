<template>
    <a-layout>
        <a-layout-sider :trigger="null">
            <div class="logo">wonderfulPaper</div>
            <hr>
            <a-menu theme="dark" mode="inline">
              <LSide></LSide>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding:0 10px"> aa</a-layout-header>
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
                <Content></Content>
            </a-layout-content>
            
        </a-layout><a-layout-sider class="siderStyle"><RSide></RSide></a-layout-sider>
    </a-layout>
</template>
<script lang="ts" setup>
import LSide from './lSide.vue';
import RSide from './rSide.vue';
import Content from './content.vue';
</script>
<style scoped>
.logo{
    color: #fff;
    text-align: center;
    padding: 16px 0;
    font-size: 20px;
}
hr{
    border: 0.5px solid #444444;
}
.siderStyle {
    text-align: center;
    color: #fff;
    background-color: #4e4e4e;
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