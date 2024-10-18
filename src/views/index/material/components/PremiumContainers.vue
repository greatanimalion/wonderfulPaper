<template>
    <div>
        <div v-for="item in imgArr" class="item">
            <img :src="item" alt="">
            <v-btn width="100%">应用</v-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import img0 from '@/assets/layoutImg/1.png';
import img1 from '@/assets/layoutImg/2.png';
let imgArr=[img0,img1];


// let p=reactive<any[]>([]);
//属实被vite的动态导入恶心到了，只能用这种最笨的方法了
// let modules
// for(let i=1;i<3;i++){
//      modules=import.meta.glob('@/assets/layoutImg/1.png',{as:'url'})
// }
// for (const path in modules) {
//   modules[path]().then((mod) => {
//     p.push(mod)
//   })
// }
</script>

<style scoped>
.item {
    height: 200px;
    width: 240px;
    background-color: rgb(58, 58, 58);
    margin: 5px;
    transition: opacity 0.3s ease-in-out;
    border-radius: 2px;
    opacity: 0.8;
    overflow: hidden;
}
.item:hover{
    opacity: 1;
}
img {
    width: 100%;
    object-fit: cover;
    height: 160px;
}
</style>