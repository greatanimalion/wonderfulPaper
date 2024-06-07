<template>
    <div class="show-content" >
        <div class="add-page" v-if="usePage.pageNum===0"><div>
            <PlusSquareOutlined :style="{ fontSize: '100px', color: '#1890ff', cursor: 'pointer' }" @click="createPage" />
            <div style="text-align: center;font-size: 18px;"></div>
        </div></div>
        <div class="content" ref="showContent" v-else>
        </div>
    </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {useDraggingElement,usePageStore} from "@/store"
import { PlusSquareOutlined } from '@ant-design/icons-vue';
// import createElement from '@/utils/createElement';

// const draggingElement=useDraggingElement()
const usePage = usePageStore()

console.log(usePage.pageNum);
const createPage=()=>{
    //usePage.createPage(720,900,'基准页面');
    (document.querySelector('.input') as HTMLInputElement).focus()//过程要比层层暴露元素效率高些，也就直接这样写了

}

const showContent = ref(null);
// onMounted(() => {
//     (showContent.value as unknown as HTMLElement).addEventListener('dragover', function (e: any) {
//         e.dataTransfer.dropEffect = 'move'
//         // 必须加这句，表示允许放置元素，否则监听不到drop事件
//         e.preventDefault()
//     }, false);
//     (showContent.value as unknown as HTMLElement).addEventListener('drop', function () {
//        (showContent.value as unknown as HTMLElement).appendChild(createElement(draggingElement.curElement))
//     }, false);
// })
</script>

<style scoped lang="scss">
.show-content {
    padding: 10px;
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
.add-page {
    justify-content: center;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
}
.content {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    background-color: rgb(255, 255, 255);
    width: 720px;
    height: 900px;
    margin: auto;
    position: relative;
}
</style>