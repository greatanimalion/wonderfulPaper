<template>
    <div>
        <div v-for="item in imgArr" class="item" >
            <img :src="item.url" alt="">
            <div>{{item.desc}}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import img0 from '@/assets/advanceComponentImg/1.png';

let imgArr=[{url:img0,desc:'echart折线图'}];



</script>

<style scoped>
.item {
    position: relative;
    width: 240px;
    background-color: rgb(58, 58, 58);
    margin: 5px;
    border-radius: 2px;
    overflow: hidden;
    cursor: pointer;
}

.item>div{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgb(0, 0, 0);
    font-size: 17px;
    z-index: 1;
    text-shadow: 1px 1px 2px rgb(104, 104, 104);
    user-select: none;
}
img {
    width: 100%;
    object-fit: cover;
    height: 160px;
}
</style>