<template>
    <div class="show-content">
        <div class="add-page" v-if="!page.create">
            <div>
                <h2><a-input placeholder="宽度(px)" v-model:value="page.width"></a-input></h2>
                <h2><a-input placeholder="高度(px)" v-model:value="page.height"></a-input></h2>
                <a-button type="primary" style="width: 184px;">
                    <div @click="createPage">创建页面</div>
                </a-button>
            </div>
        </div>
        <div v-else class="content" ref="content">
            <div :style="{ width: `${page.width}px`, height: `${page.height}px`, position: 'relative' }"
                ref="operateContent"></div>
            <Operate ref="operate"></Operate>
        </div>
    </div>
</template>


<script setup lang="ts">
import { message } from 'ant-design-vue';
import { nextTick, reactive, ref } from 'vue';
import useLayerImgStore from '@/store/useLayerImgStore';
import usePageStore from '@/store/usePageStore';
import useVnodeStore from '@/store/useVnodeStore';
import { getFn } from '@/utils/busEventFns';
import Operate from '@/components/Operate.vue';
import { init } from '@/hooks/useDrag';
const content = ref<HTMLDivElement>()
const operateContent = ref<HTMLDivElement>()
const operate = ref<InstanceType<typeof Operate>>();
const vnodeStore = useVnodeStore();
const layerImgStore = useLayerImgStore();
const pageStore = usePageStore();

const page = reactive<{ width: string, height: string, create: boolean }>({
    width: '720',
    height: '1440',
    create: false
})
function initPage() {
    nextTick(() => {
        vnodeStore.init();
        content.value!.style.height = page.height + 'px';
        content.value!.style.width = page.width + 'px';
        let top = (content.value!.parentElement?.clientHeight || 0) / 2 - (Number(page.height) || 0) / 2;
        if (top > 0) content.value!.style.top = `${top}px`;
        layerImgStore.setLayerImg(content.value)
    })
}
function createPage() {
    let height = Number(page.height);
    let width = Number(page.width);
    if (isNaN(height) || isNaN(width)) { return message.error('请输入正确的页面宽高'); }
    if (width < 300 || height < 300 || width > 100000 || height > 100000) { return message.error('页面宽高不能超过100000px或低于300px'); }
    page.create = true;
    pageStore.init(page.width, page.height)
    initPage();
    layerImgStore.setMaxLen(width > height ? "width" : "height")
    //初始化页面
    let pageState: Function;
    nextTick(() => {
        //取出页面切换函数
        pageState = getFn('openVnode');
        //初始化鼠标拖拽
        init(operateContent.value!,(t: HTMLElement)=>{
            operate.value!.elInfor.el=t;
        },({ left, top }: { left: number, top: number }) => {
                operate.value!.elInfor.top = top;
                operate.value!.elInfor.left = left;
            })

    })
    //监听鼠标放大缩小
    let zoom = 1;
    let zoomStep = 0.1;
    window.addEventListener('mousewheel', function (event: any) {
        if (pageState && pageState(true)) return
        if (!event.ctrlKey) return;
        event.preventDefault();
        let visualSpace = content.value
        if (!visualSpace) return
        let Pagecontent = visualSpace.firstChild as HTMLDivElement
        zoom = +(zoom + (event.deltaY > 0 ? zoomStep : -zoomStep)).toFixed(2);
        if (zoom < 0.1) return message.error('防缩不能小于0.1')
        //真实展现
        Pagecontent.style.scale = zoom.toString();
        //虚拟容器
        visualSpace.style.height = +page.height * zoom + 'px';
        visualSpace.style.width = +page.width * zoom + 'px';
        let top = ((content.value!.parentElement?.clientHeight || 0) / 2 - (Number(+page.height * zoom) / 2)).toFixed(2);
        if (+top > 0) content.value!.style.top = `${top}px`;
        else Pagecontent.style.top = '0';
    }, { passive: false });
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

    &>div {
        transform-origin: top left;
    }
}
</style>