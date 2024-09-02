<template>
   <div ref="layer" class="layer">
      <div class="layer-item"><img src="" alt=""></div>
      <div class="layer-item"></div>
      <div class="layer-item"></div>
      <div class="layer-item"></div>
      <div class="layer-item"></div>
      <div class="layer-item"></div>
      <div class="layer-item"></div>
   </div>
</template>

<script setup lang="ts">

import { nextTick, ref } from "vue";
import useLayerThumbnail from "@/store/useLayerImgStore";
const LayerThumbnail = useLayerThumbnail();
const layer = ref(null);


const IMGHEIGHT = 100;
function setUniformHeight(n: number) {
   const height = (layer.value as unknown as HTMLBaseElement).offsetHeight;
   const gap = Math.floor(height / (n+1))-IMGHEIGHT;
   const top=gap-IMGHEIGHT/2;
   document.querySelectorAll(".layer-item").forEach((div,index) => {
      type div =HTMLElement
      if(index!=0||index!=n-1)(div as unknown as HTMLDivElement).style.margin = `${gap}px auto  `;
      else if(index===0) (div as unknown as HTMLDivElement).style.margin = `0px auto  ${gap}px auto`;
      else (div as unknown as HTMLDivElement).style.margin = `${gap}px auto  ${top}px auto`;
   })
}

defineExpose({
   draw: () => {
      console.log(LayerThumbnail.canvas);
      nextTick(() => { setUniformHeight(7) })
   }
})
</script>

<style scoped lang="scss">
.layer {
   height: calc(100vh - 358px);
   transform:translateY(50px);
   .layer-item {
      width: 100px;
      height: 100px;
      background-color: rgba(0, 0, 0, 0.3);
      margin: auto;
      transform: rotateX(45deg) skew(25deg);
      transition: all 0.3s ease-in-out;
      opacity: 0.6;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      &:not(:first-child) {
         margin: -55px auto;
      }
      &:last-child {
         background-color: rgba(224, 224, 224, 0.3);
      }
      &:hover:last-child {
         background-color: rgba(224, 224, 224, 0.3);
         opacity: 1;
      }
      &:hover:not(:last-child) {
         background-color: rgba(0, 0, 0, 0.5);
         box-shadow: 0 0 3px 1px rgb(109, 109, 109);
         opacity: 1;
      }
  
      img {
         background-color: aliceblue;
      }
   }
}
</style>