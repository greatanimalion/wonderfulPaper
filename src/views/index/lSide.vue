<template>
    <div style="padding: 10px 0;">
        <div style="margin: 10px 3px 20px 3px;text-align: center;color: aliceblue;">基本元素</div>
        <ul class="baseElementsUL" ref="baseElementsUL">
            <li>
                <span>按钮</span>
                <div class="baseElement" draggable="true"><button mytype="button">button</button></div>
            </li>
            <li>
                <span>输入框</span>
                <div class="baseElement" draggable="true"><button mytype="input">input</button></div>
            </li>
            <li>
                <span>图片</span>
                <div class="baseElement" draggable="true"><button mytype="img">img</button></div>
            </li>
            <li>
                <span>盒子</span>
                <div class="baseElement" draggable="true"><button mytype="div">div</button></div>
            </li>
        </ul>
        <div style="margin: 20px 3px 20px 3px;text-align: center;color: aliceblue;">当前层级</div>
        <DefineInput placeHolder="宽度(px)" v-model="pageConfig.width"></DefineInput>
        <DefineInput placeHolder="高度(px)"  v-model="pageConfig.height"></DefineInput>
        <DefineInput placeHolder="标题" v-model="pageConfig.title"></DefineInput>
        <DefineInput placeHolder="层级" v-model="pageConfig.zIndex"></DefineInput>
        <div><button class="Lbutton" @click="createPage">
                <PlusOutlined />新建层级
            </button></div>
    </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch } from 'vue'
import useDraggingElement from "@/store/useDraggingElement"
import DefineInput from "@/components/DinfineInput.vue"
import { PlusOutlined } from '@ant-design/icons-vue';
import {usePageStore} from '@/store/index'
import { message } from 'ant-design-vue';
import { isNumber } from '@/utils/isNumber';
const pageStore = usePageStore()
const draggingElement = useDraggingElement()
const baseElementsUL = ref(null)
const pageConfig=reactive({
    width:'1440',
    height:'720',
    title:'',
    zIndex:'1'
})

const createPage = ()=>{
    if(!isNumber(pageConfig.width,false)||!isNumber(pageConfig.height,false)){ return message.error('请填写合法宽高');}    
    pageStore.createPage(pageConfig)
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
.Lbutton {
    padding: 5px 10px;
    height: 34px;
    width: 50%;
    margin:10px 44px;
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