<template>
    <div>
       1
        <div>
            <button class="Lbutton" @click="createPage">
                <PlusOutlined />新建层级
            </button>
            <button style="padding: 16px 12px;" @click="resetValue" class="error-button">清空</button>
        </div>
    </div>
</template>

<script setup lang="ts">

import { nextTick, reactive } from 'vue'
import useCorrespondence from "@/hooks/useCorrespondence";
import { PlusOutlined } from '@ant-design/icons-vue';

import { message } from 'ant-design-vue';
import { isNumber } from '@/utils/isNumber';

const propos = defineProps({ create: Function })

const pageDefaulteValue = {
    width: '720',
    height: '1440',
    title: '',
    zIndex: '1'
}

const pageConfig = reactive({ ...pageDefaulteValue })
const resetValue = () => {
   for(const key in pageDefaulteValue){
    //@ts-ignore
      pageConfig[key] = pageDefaulteValue[key]
   }
}
const createPage = () => {
    if (!isNumber(pageConfig.width.replace('px', ''), false,true) || 
    !isNumber(pageConfig.height.replace('px', ''), false,true)||
    !isNumber(pageConfig.zIndex, false)
) { return message.error('请填写合法宽度、高度、层级,且必须为正整数'); }
    
    propos.create?.()
    nextTick(() => {
        useCorrespondence().getFn('drawImg')?.()
    })
}

</script>

<style scoped lang="scss">
.Lbutton {
    padding: 5px 10px;
    height: 34px;
    width: 92px;
    margin: 10px 6px 10px 20px;
    background-color: #2d76b2;
    color: #fff;
    border-radius: 4px;
    transition: all 0.3s;
    &:hover {
        background-color: #006cc5;
    }
}

textarea,
input {
    height: 30px;
    width: 100%;
    outline: none;
    border: none;
    font-size: 16px;

}
</style>