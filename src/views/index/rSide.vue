<template>
    <div>
        <div>当前层级</div>
        <canvas></canvas>
        <div><button><PlusOutlined />新建层级</button></div>
    </div>
    <div>
        <div></div>
    </div>
</template>

<script setup lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue';
</script>

<style scoped>
button{
    padding: 5px 10px;
    background-color: #2d76b2;
    color: #fff;
    border-radius: 4px;
    transition: all 0.3s;
    &:hover{
        background-color: #006cc5;
    }
}
</style>