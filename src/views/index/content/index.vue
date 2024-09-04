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
            height: usePage.getIndexPage(Number(usePage.curIndex))!.resizeHeight + 'px',
            position: 'relative',
        }">
            <!-- {{ mouse.x }},{{ mouse.y }} -->
        </div>
    </div>
</template>


<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { usePageStore } from "@/store"
import { PlusSquareOutlined } from '@ant-design/icons-vue';
import createElement from '@/hooks/createElement';
// import useMousePosition from '@/hooks/useMousePosition';
// import createLayerImg from "@/utils/createLayerImg";
// import useLayerThumbnail from '@/store/useLayerImgStore';


const usePage = usePageStore()
const showContent = ref<HTMLDivElement | null>(null);
// const mouse = reactive({ x: 0, y: 0 })

// let removeMouseListener: Function | null = null;
watch(() => usePage.pageNum, () => {
    if (showContent.value) return;
    // nextTick(() => {
    //     removeMouseListener = useMousePosition(showContent.value as unknown as HTMLBaseElement, mouse)
    // })
    nextTick(() => {
        let taraget = showContent.value as HTMLDivElement;
        createElement(taraget)
    })
})
const createPage = () => {
    (document.querySelector('.input') as HTMLInputElement).focus()

}

// onUnmounted(() => {
//     // removeMouseListener && removeMouseListener()


// })
let defaultHeight: number = 0;
onMounted(() => {
    window.addEventListener('mousewheel', function (event: any) {
        if (!event.ctrlKey) return;
        event.preventDefault();
        usePage.setZoom(event.wheelDelta > 0 ? 0.1 : -0.1);
        if (!defaultHeight && showContent.value) defaultHeight = defaultHeight ? defaultHeight : +getComputedStyle(showContent.value.parentElement!).height.replace('px', '')
        if (defaultHeight > +usePage.getIndexPage(Number(usePage.curIndex))!.resizeHeight!) {
            console.log(1);
            showContent.value?.parentElement?.classList.add('flex')
        }
        else showContent.value?.parentElement?.classList.remove('flex')
    }, { passive: false });
})
onMounted(() => {

})
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