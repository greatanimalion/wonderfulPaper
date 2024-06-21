<template>
   <div ref="layer" class="layer">
      <div class="layer-div">1111</div>
      <div class="layer-div"><img src="" alt=""></div>
      <div class="layer-div"></div>
      <div class="layer-div"><img src="" alt=""></div>
      <div class="layer-div"></div>
   </div>
</template>

<script setup lang="ts">

import { nextTick, ref } from "vue";
import useLayerThumbnail from "@/store/useLayerImgStore";
const LayerThumbnail = useLayerThumbnail();

const IMGHEIGHT = 70;
function setUniformHeight(n: number) {
   const height = (layer.value as unknown as HTMLBaseElement).offsetHeight;
   const gap = Math.floor(height / n);
   console.log(gap);
   
   document.querySelectorAll(".layer-div").forEach((div,index) => {
      if(index!=0)div.style.margin = `${0}px auto  ${0}px auto`;
   })
}
defineExpose({
   draw: () => {
      console.log(LayerThumbnail.canvas);
      nextTick(() => { setUniformHeight(10) })
   }
})

const layer = ref(null);

</script>

<style scoped lang="scss">
.layer {
   height: calc(100vh - 358px);

   div {
      width: 100px;
      height: 100px;
      background-color: rgba(0, 0, 0, 0.3);
      margin: auto;
      transform: rotateX(45deg) skew(25deg);
      transition: all 0.3s ease-in-out;
      opacity: 0.6;
      cursor: pointer;

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

      display: flex;
      align-items: center;
      justify-content: center;

      img {
         background-color: aliceblue;
      }
   }
}
</style>