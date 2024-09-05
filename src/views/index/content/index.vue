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
            width: usePage.getIndexPage(usePage.curIndex)!.resizeWidth + 'px',
            height: usePage.getIndexPage(usePage.curIndex)!.resizeHeight + 'px',
            position: 'relative',
        }">
        </div>

    </div>
</template>


<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { usePageStore } from "@/store"
import { PlusSquareOutlined } from '@ant-design/icons-vue';
import dragCreateElement from '@/hooks/createElement';

const usePage = usePageStore()
const showContent = ref<HTMLDivElement | null>(null);

watch(() => usePage.pageNum, () => {
    nextTick(() => {
        let taraget = showContent.value as HTMLDivElement;
        dragCreateElement(taraget)
        central()
    })
})
watch(() => !!usePage.pageNum, () => {
    window.addEventListener('mousewheel', function (event: any) {
        if (!event.ctrlKey) return;
        event.preventDefault();
        usePage.setZoom(event.wheelDelta > 0 ? 0.1 : -0.1);
        if (!defaultHeight && showContent.value) defaultHeight = defaultHeight ? defaultHeight : +getComputedStyle(showContent.value.parentElement!).height.replace('px', '')
        if (defaultHeight > +usePage.getIndexPage(usePage.curIndex)!.resizeHeight!) {
            central()
        }
        else showContent.value!.style!.marginTop = '0px'
    }, { passive: false });
})
function central() {
    if ((+usePage.getIndexPage(usePage.curIndex)!.resizeHeight!) < (+getComputedStyle(showContent.value?.parentElement!).height.replace('px', ''))) {
        const marginTop = ((+getComputedStyle(showContent.value?.parentElement!).height.replace('px', '')) - (+usePage.getIndexPage(usePage.curIndex)!.resizeHeight!)) / 2
        showContent.value!.style!.marginTop = marginTop.toFixed(0) + 'px'
    }
    else showContent.value!.style!.marginTop ='0px'
}
const createPage = () => {
    (document.querySelector('.input') as HTMLInputElement).focus()
}

let defaultHeight: number = 0;


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