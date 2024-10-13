<template>
    <div class="define-event event">
        <div class="event-title"><BgColorsOutlined />定义事件</div>
    </div>
    <div class="add-animation event">
        <div class="event-title"><DeploymentUnitOutlined />添加动画</div>
    </div>
    <div class="modify-style event">
        <div class="event-title"><FormOutlined />样式修改</div>
    </div>
</template>

<script setup lang="ts">
import { FormOutlined,BgColorsOutlined,DeploymentUnitOutlined} from '@ant-design/icons-vue';
</script>

<style scoped lang="scss">
.event {
    height: 200px;
    text-align: left;
    padding: 6px;
}

.event-title {
    font-family: cursive;
    font-size: large;
    text-align: center;
    cursor:default;
    span{
        margin: 0 5px;
    }
}
</style>