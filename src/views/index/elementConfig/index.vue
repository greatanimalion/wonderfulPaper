<template>
    <div class="define-event event">
        <div class="event-title">
            <v-btn width="100%" color="black">
                <BgColorsOutlined />定义事件
            </v-btn>
        </div>
    </div>
    <div class="modify-style event">
        <div class="event-title">
            <v-btn width="100%" color="black">
                <FormOutlined />添加样式
            </v-btn>
        </div>
        <div class="modify-style-content">
            <div v-show="!!vnodeStore.curVnode&&!!vnodeStore.curVnode.id">
                <div class="item">
                    <VCombobox keyName="height" v-model="TLHW.height" label="高度"></VCombobox>
                    <VCombobox keyName="width" v-model="TLHW.width" label="宽度"></VCombobox>
                    <VCombobox keyName="top" v-model="TLHW.top" label="相对上侧"></VCombobox>
                    <VCombobox keyName="left" v-model="TLHW.left" label="相对左侧"></VCombobox>
                </div>
                <div class="item" v-for="item, index in finalStyle" :key="index" v-show="item.value !== ''">
                    <VCombobox :keyName="item.key" v-model="item.value" :label="item.descriptions"></VCombobox>
                    <!-- <v-combobox @update:search="(e:string)=>{console.log(e)}" style="height: 55px;" :label="item.descriptions" :model-value="item.value"
                    :items="item.values"></v-combobox> -->
                </div>
            </div>
        </div>
    </div>
    <div class="add-animation event">
        <div class="event-title">
            <v-btn width="100%" color="black">
                <DeploymentUnitOutlined />添加动画
            </v-btn>
        </div>
    </div>

</template>

<script setup lang="ts">
import { FormOutlined, BgColorsOutlined, DeploymentUnitOutlined } from '@ant-design/icons-vue';
import { watch, reactive, computed } from 'vue';
import useVnodeStore from '@/store/useVnodeStore';
import parseCssToObject from '@/utils/parseCssToObject';
import styleSheet from '@/const/styleList';
import type { Vnode } from '@/types/Vnode'
import VCombobox from '@/components/vComBoBox.vue';
const vnodeStore = useVnodeStore();

let TLHW = computed(() => {
    return {
        height: vnodeStore.curVnode?.height.toFixed(0) ? vnodeStore.curVnode.height.toFixed(0) + 'px' : '',
        width: vnodeStore.curVnode?.width.toFixed(0) ? vnodeStore.curVnode.width.toFixed(0) + 'px' : '',
        top: vnodeStore.curVnode?.top.toFixed(0) ? vnodeStore.curVnode?.top.toFixed(0) + 'px' : '',
        left: vnodeStore.curVnode?.left.toFixed(0) ? vnodeStore.curVnode?.left.toFixed(0) + 'px' : ''
    }
})

let finalStyle = reactive((() => {
    let item: any = {};
    for (let key in styleSheet) {
        item[key] = {};
        item[key].key = key;
        item[key].descriptions = styleSheet[key].descriptions;
        item[key].value = '';
    }
    return item as Record<string, { key: string, descriptions: string, value: string }>;
})())

let preVndoe: Vnode | null = null;
watch(() => vnodeStore.curVnode, () => {
    if (!!vnodeStore.curVnode && !!vnodeStore.curVnode.parent) {
        preVndoe = vnodeStore.curVnode;
        let cssObject = parseCssToObject(vnodeStore.curVnode!.HTML!.style.cssText);
        for (let key in cssObject) {
            finalStyle[key].value = cssObject[key];
        }
    }
})

</script>

<style scoped lang="scss">
.modify-style {
    .modify-style-content {
        overflow: auto;
        height: calc(33vh - 35px);
        overflow: auto;

    }
}

.event {
    min-height: 33%;
    max-height: 33%;
    text-align: left;
    padding: 3px
}

.event-title {
    font-family: cursive;
    font-size: large;
    text-align: center;
    cursor: default;

    span {
        margin: 0 5px;
    }
}
</style>
