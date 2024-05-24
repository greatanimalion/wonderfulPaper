<template>
    <div ref="dragLayout" style="width: 100%;height: 100%;">
         <layout ></layout>
    </div>
   
</template>

<script setup lang="ts">
import layout from './layout.vue'
import { nextTick,ref } from 'vue'

const dragLayout = ref(null)
nextTick(() => {
    nextTick(() => {
        console.log(dragLayout.value);
    })
   
})
</script>

<style scoped>
</style>