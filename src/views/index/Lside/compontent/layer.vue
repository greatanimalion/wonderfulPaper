<template>
   <div ref="layer" class="layer">
   </div>
</template>

<script setup lang="ts">

import { ref } from "vue";
import useCorrespondence from "@/hooks/useCorrespondence";
import { usePageStore } from "@/store";
import { Layer_Img_Width } from '@/const/index'
import useLayerThumbnail from "@/store/useLayerImgStore";

const layer = ref<HTMLDivElement | null>(null);
const pageStore = usePageStore();
const layerThumbnail = useLayerThumbnail();
function setUniformHeight() {
   let n = pageStore.getPageNum();
   const height = layer.value!.offsetHeight;
   const gap = Math.floor(height / (n + 1)) - Layer_Img_Width;
   const top = gap - Layer_Img_Width / 2;
   document.querySelectorAll(".layer-item").forEach((div: any, index) => {
      if (index != 0 || index != n - 1) div.style.margin = `${gap}px auto  `;
      else if (index === 0) div.style.margin = `0px auto  ${gap}px auto`;
      else div.style.margin = `${gap}px auto  ${top}px auto`;
   })
}
//添加缩略图
const addLayerThumbnail = () => {
   const div = document.createElement("div");
   div.dataset.index = pageStore.curIndex.toString();
   layer.value?.childNodes.forEach((item: any) => {
      item.classList.remove("layer-choose");
   })
   div.className="layer-item layer-choose";
   if (layer.value?.childNodes[0]) layer.value!.insertBefore(div, layer.value?.childNodes[0]!)
   else layer.value!.appendChild(div)
   let img = document.createElement("img");
   let maxLenght = +pageStore.getCurrentPage()!.height>+pageStore.getCurrentPage()!.width?'height':'width'
   layerThumbnail.setLayerThumbnail(pageStore.curIndex, img,maxLenght)
   div.appendChild(img)
   div.onclick = (e: any) => {
      let index=+e.target.dataset.index
      if(index==pageStore.curIndex)return 
      // 切换当前页
      pageStore.changeCurrentPage(e.target.dataset.index);
      // 重置内容
      (document.querySelector(".content") as HTMLElement).innerHTML = "";
      // 由数据渲染页面

      // 重置缩略图
      layerThumbnail.resetLayerThumbnail(index)
      useCorrespondence().getFn('central')?.()
      let allItem = document.getElementsByClassName("layer-item");
      Array.prototype.forEach.call(allItem, (item: any) => {
         item.classList.remove("layer-choose");
      })
      e.target.classList.add("layer-choose");
   }
}
//重置你内容
useCorrespondence().addFn('drawImg', () => {
   let container = document.querySelector(".content") as HTMLElement;
   if(container)container.innerHTML = "";
   addLayerThumbnail()
   setUniformHeight()
})


</script>

<style lang="scss">
.layer-choose {
   border: #ffffff dashed 2px;
   opacity: 1 !important;
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