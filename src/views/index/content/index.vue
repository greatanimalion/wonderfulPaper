<template>
    <div class="show-content">

        <div class="add-page" v-if="usePage.pageNum === 0">
            <div>
                <PlusSquareOutlined :style="{ fontSize: '100px', color: '#1890ff', cursor: 'pointer' }"
                    @click="createPage" />
                <div style="text-align: center;font-size: 18px;"></div>
            </div>
        </div>
        <div class="content" ref="showContent" v-else :style="{
            width: usePage.getIndexPage(Number(usePage.curIndex))!.resizeWidth + 'px',
            height: usePage.getIndexPage(Number(usePage.curIndex))!.resizeHeight + 'px'
        }"> {{ mouse.x }},{{ mouse.y }}
        </div>
    </div>
</template>


<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { usePageStore } from "@/store"
import { PlusSquareOutlined } from '@ant-design/icons-vue';
import useMousePosition from '@/hooks/useMousePosition';
// import createLayerImg from "@/utils/createLayerImg";
// import useLayerThumbnail from '@/store/useLayerImgStore';


const usePage = usePageStore()
const showContent = ref<HTMLDivElement | null>(null);
const mouse = reactive({ x: 0, y: 0 })

let removeMouseListener: Function | null = null;
watch(() => usePage.pageNum, () => {
    if (showContent.value) return;
    nextTick(() => {
        removeMouseListener = useMousePosition(showContent.value as unknown as HTMLBaseElement, mouse)
    })

})
const createPage = () => {
    (document.querySelector('.input') as HTMLInputElement).focus()//过程要比层层暴露元素效率高些，也就直接这样写了
}

onUnmounted(() => {
    //卸载鼠标位置监听
    removeMouseListener && removeMouseListener()
})
let defaultHeight: number = 0;
onMounted(() => {
    window.addEventListener('mousewheel', function (event: any) {
        if (!event.ctrlKey) return;
        event.preventDefault();
        usePage.setZoom(event.wheelDelta > 0?0.1:-0.1);
        if (!defaultHeight&&showContent.value) defaultHeight = defaultHeight ? defaultHeight :+getComputedStyle(showContent.value.parentElement!).height.replace('px', '')
        if(defaultHeight>+usePage.getIndexPage(Number(usePage.curIndex))!.resizeHeight!){console.log(1);
         showContent.value?.parentElement?.classList.add('flex')}
        else showContent.value?.parentElement?.classList.remove('flex')
    }, { passive: false });
})
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
    position: relative;
    margin: auto;
}
</style>