<template>
    <div style="width: 100%;height: 100%;">
         <layout ></layout>
    </div>
</template>

<script setup lang="ts">
import layout from './layout.vue'
import { onMounted, reactive, markRaw ,isReactive} from 'vue'
 const foo = markRaw({1:1})
 const bar = reactive({ foo })
onMounted(() => {
   


// 也适用于嵌套在其他响应性对象

console.log(isReactive(bar.foo)) // false
})
</script>

<style scoped>
</style>