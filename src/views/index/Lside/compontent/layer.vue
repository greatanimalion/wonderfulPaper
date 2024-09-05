<template>
   <div ref="layer" class="layer">
   </div>
</template>

<script setup lang="ts">

import {ref } from "vue";
import useCorrespondence from "@/hooks/correspondence";
import { usePageStore } from "@/store";
import { Layer_Img_Width } from '@/const/index'
const layer = ref<HTMLDivElement | null>(null);
const pageStore = usePageStore();
function setUniformHeight() {
   let n = pageStore.getPageNum();
   const height = layer.value!.offsetHeight;
   const gap = Math.floor(height / (n + 1)) - Layer_Img_Width;
   const top = gap - Layer_Img_Width / 2;
   document.querySelectorAll(".layer-item").forEach((div:any, index) => {
      if (index != 0 || index != n - 1) div.style.margin = `${gap}px auto  `;
      else if (index === 0) div.style.margin = `0px auto  ${gap}px auto`;
      else div.style.margin = `${gap}px auto  ${top}px auto`;
   })
}
let i=0
const addLayerThumbnail = () => {
   const div = document.createElement("div");
   div.classList.add("layer-item");
   layer.value!.appendChild(div)
   i++
   div.setAttribute("data-index",i.toString())
   div.onclick = (e:any) => {      
      let allItem=document.getElementsByClassName("layer-item");
      Array.prototype.forEach.call(allItem, (item:any) => {
         item.classList.remove("layer-choose");
         
      })
      e.target.classList.add("layer-choose");
   }
}
useCorrespondence().addFn('draw',()=>{
   addLayerThumbnail()
   setUniformHeight()
})


</script>

<style lang="scss">
.layer-choose{
   border: #ffffff dashed 2px;
}
.layer {
   height: calc(100vh - 358px);
   transform: translateY(50px);
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