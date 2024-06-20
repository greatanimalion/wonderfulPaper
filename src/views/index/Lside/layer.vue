<template>
   <div ref="layer">
         <div><img src="" alt=""></div>
   </div>
</template>

<script setup lang="ts">

import { ref } from "vue";
import useLayerThumbnail from "@/store/useLayerImgStore";
const LayerThumbnail = useLayerThumbnail();

defineExpose({
   draw:()=>{
      console.log(LayerThumbnail.canvas);
   }
})

const layer = ref(null);

</script>

<style scoped>
</style>