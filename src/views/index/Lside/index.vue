<template>
    <div style="padding: 10px 0;">
        <div class="createLayer" v-if="pageStore.pageNum" @click="create = !create">
            <FormOutlined v-show="create" class="layerEditButton" />
            <RollbackOutlined v-show="!create" class="layerEditButton" />
        </div>
        <div style="margin: 10px 3px 20px 3px;text-align: center;color: aliceblue;">基本元素</div>
        <ul class="baseElementsUL" ref="baseElementsUL">
            <li v-for="(i) in elementList"><span>{{ i.name }}</span>
                <div class="baseElement">
                    <button mytype="button" candrag="true" draggable="true">{{ i.type }}</button>
                </div>
            </li>
        </ul>
        <div style="margin: 20px 3px 20px 3px;text-align: center;color: aliceblue;">层级</div>
        <KeepAlive><component :is="create? Create : Layer" :create="()=>{create=!create}" /></KeepAlive> 
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {  FormOutlined, RollbackOutlined } from '@ant-design/icons-vue';
import { usePageStore } from '@/store/index'
import Layer from './compontent/layer.vue'
import Create from './compontent/create.vue';

const pageStore = usePageStore()
const baseElementsUL = ref(null)

const elementList = [
    { name: '按钮', type: 'button' },
    { name: '输入框', type: 'input' },
    { name: '图片', type: 'img' },
    { name: '方块', type: 'div' }
]
const create = ref(true)

</script>

<style scoped lang="scss">
.layerEditButton {
    font-size: 20px;
    cursor: pointer;
    color: #fff;
}


.createLayer {
    position: absolute;
    z-index: 10;
    top: 329px;
    width: 30px;
    height: 30px;
    left: 152px;
}
li {
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
    span {
        font-size: 14px;
        width: 57px;
        text-align: center;
    }

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

</style>