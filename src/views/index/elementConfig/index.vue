<template>
    <div class="define-event event">
        <div class="event-title">
            <v-btn width="100%" color="black">
                <BgColorsOutlined />定义事件
            </v-btn>
            <div>

            </div>
        </div>
    </div>
    <div class="modify-style event">
        <div class="event-title">
            <v-btn width="49%" style="margin-right: 2%;" color="black">
                <FormOutlined />添加样式
            </v-btn>
            <div style="display: inline-block;" width="49%" @click="handleLock">
                <v-btn v-if="lockEl" color="black">
                    <LockOutlined />元素嵌入
                </v-btn>
                <v-btn v-else color="black">
                    <UnlockOutlined />元素游动
                </v-btn>
            </div>
        </div>
        <div class="modify-style-content">
            <div v-show="!!vnodeStore.curVnode && !!vnodeStore.curVnode.id">
                <div class="item">
                    <VCombobox ENname="height" :modelValue="TLHW.height" ZHname="高度"></VCombobox>
                    <VCombobox ENname="width" :modelValue="TLHW.width" ZHname="宽度"></VCombobox>
                    <VCombobox ENname="top" :modelValue="TLHW.top" ZHname="相对上侧"></VCombobox>
                    <VCombobox ENname="left" :modelValue="TLHW.left" ZHname="相对左侧"></VCombobox>
                </div>
                <div class="item" v-for="key, index in Object.keys(finalStyle)" :key="index"
                    v-show="finalStyle[key].value !== ''">
                    <VCombobox :list="finalStyle[key].list" :ZHname="finalStyle[key].descriptions" :ENname="key"
                        :modelValue="finalStyle[key].value"></VCombobox>
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
import { FormOutlined, BgColorsOutlined, DeploymentUnitOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons-vue';
import { watch, reactive, computed, ref, markRaw } from 'vue';
import useVnodeStore from '@/store/useVnodeStore';
import parseCssToObject from '@/utils/parseCssToObject';
import styleSheet from '@/const/styleList';
import VCombobox from '@/components/vComBoBox.vue';
import invertRGBtoHex from '@/utils/invertRGBtoHex'
import { useBlur } from '@/hooks/useBlur';
import { type Item } from '@/types/StyleItem';
const handleBlur = useBlur();
const vnodeStore = useVnodeStore();
const lockEl = ref(false)
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
        item[key].list = markRaw(styleSheet[key].list || []);
    }
    return item as Item;
})())
function handleLock() {
    if (!vnodeStore.curVnode) return;
    
    handleBlur(lockEl ? 'absolute' : 'relative', 'position')
    lockEl.value = !lockEl.value
    
}
watch(() => vnodeStore.curVnode, () => {
    if (!!!vnodeStore.curVnode) return
    if (!!!vnodeStore.curVnode.parent) return //保证不是根节点    
    let cssObject = parseCssToObject(vnodeStore.curVnode!.HTML!.style.cssText);
    for (let key in cssObject) {
        //@ts-ignoreF
        if (!finalStyle[key]) finalStyle[key] = { list: [] };
        if (key == 'position') { cssObject[key] == 'absolute' ? lockEl.value = false : lockEl.value = true; continue; }
        if (key === 'background-color' || key === 'color') {
            //由于cssText自动将color值转换为rgb而input的type=color时,value属性只接受hex,所以需要将其转换为hex
            finalStyle[key].value = invertRGBtoHex(finalStyle[key].value!)
            continue;
        }
        finalStyle[key].value = cssObject[key];
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

.select-list {
    position: fixed;
    top: 314px;
    border-radius: 4px;
    right: 5px;
    padding: 2px 0;
    background-color: #121212;
    display: none;

    li {
        margin: 4px 0;
        padding: 3px;
        font-size: 14px;
        background-color: rgb(51 51 51);
        width: 160px;
        text-align: center;
        transition: background-color 0.3s ease;
        cursor: pointer;

        &:hover {
            background-color: rgb(72, 72, 72);
        }
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
