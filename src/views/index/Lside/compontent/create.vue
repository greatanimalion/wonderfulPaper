<template>
    <div>
        <DefineInput placeHolder="宽度(建议720px)" v-model="pageConfig.width"></DefineInput>
        <DefineInput placeHolder="高度(建议1440px)" v-model="pageConfig.height"></DefineInput>
        <DefineInput placeHolder="标题(空)" v-model="pageConfig.title"></DefineInput>
        <DefineInput placeHolder="层级" v-model="pageConfig.zIndex"></DefineInput>
        <div>
            <button class="Lbutton" @click="createPage">
                <PlusOutlined />新建层级
            </button>
            <button style="padding: 16px 12px;" @click="resetValue" class="error-button">清空</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import DefineInput from "@/components/DinfineInput.vue"
import { nextTick, reactive } from 'vue'
import useCorrespondence from "@/hooks/useCorrespondence";
import { PlusOutlined } from '@ant-design/icons-vue';
import { usePageStore } from '@/store/index'
import { message } from 'ant-design-vue';
import { isNumber } from '@/utils/isNumber';
import keyFromStringToNumber from "@/utils/keyFromStringToNumber";
const propos = defineProps({ create: Function })
const pageStore = usePageStore()
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
      pageConfig[key] = defaulteValue[key]
   }
}
const createPage = () => {
    if (!isNumber(pageConfig.width.replace('px', ''), false) || !isNumber(pageConfig.height.replace('px', ''), false)) { return message.error('请填写合法宽高'); }
    if (!pageStore.createPage(keyFromStringToNumber<'zIndex',typeof pageConfig>(pageConfig,[ 'zIndex']))) return
    propos.create?.()
    nextTick(() => {
        useCorrespondence().getFn('draw')?.()
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