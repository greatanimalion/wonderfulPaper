<template>
    <div class="show-content" ref="showContent">
        <div class="content">
            <p>a</p>
        </div>
    </div>
</template>


<script setup lang="ts">
// import { createButton } from '@/utils/createElement';
import { onMounted, ref } from 'vue';

const showContent = ref(null);
onMounted(() => {
    (showContent.value as unknown as HTMLElement).addEventListener('dragover', function (e: any) {
        e.dataTransfer.dropEffect = 'move'
        // 必须加这句，表示允许放置元素，否则监听不到drop事件
        e.preventDefault()
    }, false);


    (showContent.value as unknown as HTMLElement).addEventListener('drop', function (e: any) {
        console.log(e);
        
        (showContent.value as unknown as HTMLElement).appendChild(e.target.cloneNode(true))
    }, false);
})
</script>

<style scoped lang="scss">
.show-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #999;
        border-radius: 4px;
    }
}

.content {
    background-color: rgb(255, 255, 255);
    width: 720px;
    height: 900px;
    margin: auto;
}
</style>