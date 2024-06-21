<template>
    <div style="padding: 10px 0;">
        <div class="createLayer" v-if="pageStore.pageNum" @click="create = !create">
            <FormOutlined v-show="create"  class="layerEditButton"  />
            <RollbackOutlined v-show="!create" class="layerEditButton" />
        </div>
        <div style="margin: 10px 3px 20px 3px;text-align: center;color: aliceblue;">基本元素</div>
        <ul class="baseElementsUL" ref="baseElementsUL">
          <li v-for="(i) in elementList"><span>{{ i.name }}</span><div class="baseElement" draggable="true"><button mytype="button">{{ i.type }}</button></div></li>
        </ul>
        <div style="margin: 20px 3px 20px 3px;text-align: center;color: aliceblue;">层级</div>
        <Transition>
            <div v-show="create">
                <DefineInput placeHolder="宽度(默认1440px)" v-model="pageConfig.width"></DefineInput>
                <DefineInput placeHolder="高度(默认720px)" v-model="pageConfig.height"></DefineInput>
                <DefineInput placeHolder="标题" v-model="pageConfig.title"></DefineInput>
                <DefineInput placeHolder="层级" v-model="pageConfig.zIndex"></DefineInput>
                <div><button class="Lbutton" @click="createPage">
                        <PlusOutlined />新建层级
                    </button></div>
            </div>
        </Transition>
        <Transition>
            <div v-show="!create">
                <Layer ref="draw"></Layer>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import useDraggingElement from "@/store/useDraggingElement"
import DefineInput from "@/components/DinfineInput.vue"
import { PlusOutlined, FormOutlined ,RollbackOutlined} from '@ant-design/icons-vue';
import { usePageStore } from '@/store/index'
import { message } from 'ant-design-vue';
import { isNumber } from '@/utils/isNumber';
import Layer from './layer.vue'
import useLayerThumbnail from '@/store/useLayerImgStore';
const layerThumbnail = useLayerThumbnail()
//创建层级与层级缩略图显示
const create = ref(true)
const pageStore = usePageStore()
const draggingElement = useDraggingElement()
const baseElementsUL = ref(null)
const pageConfig = reactive({
    width: '1440',
    height: '720',
    title: '',
    zIndex: '1'
})
const elementList=[
    {name:'按钮',type:'button'},
    {name:'输入框',type:'input'},
    {name:'图片',type:'img'},
    {name:'方块',type:'div'}
]
const draw =ref(null)
const createPage = () => {
    if (!isNumber(pageConfig.width, false) || !isNumber(pageConfig.height, false)) { return message.error('请填写合法宽高'); }
    if(!pageStore.createPage(pageConfig))return message.error('层级已存在'); 
    layerThumbnail.setLayerThumbnail({width:Number(pageConfig.width), height: Number(pageConfig.height),url: ''})
    create.value=false;
    (draw.value as unknown as {draw: () => void}).draw();
    
}

onMounted(() => {
    (baseElementsUL.value as unknown as HTMLElement).addEventListener('dragstart', (e: DragEvent) => {
        draggingElement.setDraggingElement(((e.target as HTMLElement).querySelector('button') as HTMLButtonElement).innerHTML);
        console.log(((e.target as HTMLElement).querySelector('button') as HTMLButtonElement).innerHTML);

    });
    (baseElementsUL.value as unknown as HTMLElement).addEventListener('dragend', () => {
        draggingElement.clearDraggingElement()
    });
})

</script>

<style scoped lang="scss">
.layerEditButton {
    font-size: 20px;
    cursor: pointer;
    color: #fff;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.createLayer {
    position: absolute;
    z-index: 10;
    top: 329px;
    width: 30px;
    height: 30px;
    left: 152px;
}

.Lbutton {
    padding: 5px 10px;
    height: 34px;
    width: 50%;
    margin: 10px 44px;
    background-color: #2d76b2;
    color: #fff;
    border-radius: 4px;
    transition: all 0.3s;

    &:hover {
        background-color: #006cc5;
    }
}

li {
    span {
        font-size: 14px;
        width: 57px;
        text-align: center;
    }

    color: wheat;
    margin: 5px 4px;
    display: flex;
    height: 50px;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #4e4e4e;

    background-color: #2d2d2d;
    transition: all 0.3s ease-in-out;
    border-radius: 3px;

    &:hover {
        border-color: #2f9ecd;
    }

    .baseElement {
        cursor: move;
        margin: 4px 0;
        width: 70px;
        padding: 0px;
        overflow: hidden;
    }
}

button {
    width: 100%;
    font-size: 11px;
    color: #ec9f9f;
    background-color: #4e4e4e;
}

textarea,
input {
    height: 30px;
    width: 100%;
    outline: none;
    border: none;
    font-size: 16px;

}

.h {
    width: 100px;
}
</style>