<template>
    <div class="show-content" >
        <div class="add-page" v-if="!page.create">
            <div>
                <h2><a-input placeholder="宽度(px)" v-model:value="page.width"></a-input></h2>
                <h2><a-input placeholder="高度(px)" v-model:value="page.height"></a-input></h2>
                <a-button type="primary" style="width: 184px;"><div @click="createPage">创建页面</div></a-button>
            </div>
        </div>
        <div v-else class="content" :style="`width: ${page.width}px; height: ${page.height}px;`">
            <div></div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { message } from 'ant-design-vue';
import { nextTick, reactive } from 'vue';
import useLayerImgStore from '@/store/useLayerImgStore';
import usePageStore from '@/store/usePageStore';
import useVnodeStore from '@/store/useVnodeStore';
const vnodeStore = useVnodeStore();
const layerImgStore = useLayerImgStore();
const pageStore = usePageStore();
const page = reactive<{width: string, height: string, create: boolean}>({
    width: '',
    height: '',
    create:false
})
function initPage() {
    nextTick(() => {
          let content = document.querySelector<HTMLDivElement>('.content');
          vnodeStore.init();
          let top= (content?.parentElement?.clientHeight || 0) / 2 - (Number(page.height) || 0) / 2;
          if(top>0)content!.style.top = `${top}px`;
          layerImgStore.setLayerImg(content!)
    })
}
function createPage() {
    let height=Number(page.height);
    let width=Number(page.width);
    if(isNaN(height) || isNaN(width)){
        return message.error('请输入正确的页面宽高');
    }   
    if(width<100 ||height<100 ||width>100000 ||height>100000){
        return message.error('页面宽高不能超过100000px或低于100px');
    }
    page.create = true;
    pageStore.init(page.width,page.height)

    initPage();
    layerImgStore.setMaxLen(width>height?"width":"height")
}
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
    position: relative;
    margin: auto;
}
</style>