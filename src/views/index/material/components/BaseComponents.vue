<template>
    <div>
        <ul>
            <li v-for="(item, index) in BASE_ELEMENT" :key="index">{{item}}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import {BASE_ELEMENT} from '@/const/baseElement'
</script>

<style scoped>
ul{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 0 5px;
    margin-top: 5px;
}
li{
    line-height: 40px;
    text-align: center;
    color:var(--difine-font-color-light);
    cursor: pointer;
    font-size: 14px;
    border-radius: 3px;
    border: 1px solid #605f5f;
    transition: all 0.3s;
}
li:hover{
    background-color: #494949;
    color: white;
}
</style>