<template>
    <div class="show-content" ref="showContent">
        <div class="content" @click="handleClick">qq</div>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createButton } from '@/utils/createButton';
const showContent = ref(null)

function handleClick() {
     console.log(createButton());
     
}

onMounted(() => {
    (showContent?.value as any).addEventListener('dragenter',function(){
    console.log('dragenter');
   
    console.log('createButton');
    
})
})
</script>

<style scoped>
.show-content {
    background-color: bisque;
}
</style>