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
            <div class="item" v-for="item, index in finalStyle" :key="index" v-show="item.value!=''">
                <v-combobox :blur="(e:any)=>{console.log(e)}"  style="height: 55px;" :label="item.descriptions" v-model="item.value"
                    :items="item.values"></v-combobox>
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
import { watch, watchEffect, markRaw, reactive, WatchHandle } from 'vue';
import useVnodeStore from '@/store/useVnodeStore';
import parseCssToObject, { parseObjectToCssText } from '@/utils/parseCssToObject';
import styleSheet from '@/const/styleList';
import type { Vnode } from '@/types/Vnode'
import debounce from '@/utils/debounce';
const vnodeStore = useVnodeStore();
let finalStyle = reactive((() => {
    let item: any = {};
    for (let key in styleSheet) {
        item[key] = {};
        item[key].descriptions = styleSheet[key].descriptions;
        item[key].values = markRaw(styleSheet[key].value);
        item[key].value = '';
    }
    return item as Record<string, { descriptions: string, values: string[], value: string }>;
})())

let preVndoe: Vnode | null = null;
const debouncedUpdateStyle = debounce((obj: Record<string, string>) => {
    preVndoe!.style = parseObjectToCssText(obj);
    preVndoe!.HTML!.style.cssText += preVndoe!.style;
}, 200)
let _flage = false;//除第一次依赖搜集外，其他时候减少无用代码执行
watchEffect(() => {
    if (!_flage) {
        for (let _key in finalStyle) {
            //收集依赖
            finalStyle[_key].value;
        }
        _flage = true;
        return;
    }
    if (!preVndoe) return;
    let obj = {} as Record<string, string>;
    for (let key in finalStyle) {
        if(finalStyle[key].value=='')continue
        obj[key] = finalStyle[key].value;
    }
    console.log(obj);
    
    preVndoe.left = parseFloat(obj.left) || 0;
    preVndoe.top = parseFloat(obj.top) || 0;
    preVndoe.width = parseFloat(obj.width) || 0;
    preVndoe.height = parseFloat(obj.height) || 0;
    debouncedUpdateStyle(obj);
})


let _scope:WatchHandle
watch(() => vnodeStore.curVnode, () => {    
    if (!!vnodeStore.curVnode && !!vnodeStore.curVnode.parent) {
        preVndoe = vnodeStore.curVnode;
        let cssObject = parseCssToObject(vnodeStore.curVnode!.style);
        console.log(12121);
        cssObject = {
            ...cssObject,
            width: vnodeStore.curVnode!.width + 'px',
            height: vnodeStore.curVnode!.height.toFixed(1) + 'px',
            top: vnodeStore.curVnode!.top + 'px',
            left: vnodeStore.curVnode!.left.toFixed(1) + 'px'
        }
        for (let key in cssObject) {
            finalStyle[key].value = cssObject[key];
        }
        //专门对 top、left、width、height 进行监听,由于其改变的频繁性，单独收集其依赖，
        
    }
})

</script>

<style scoped lang="scss">
.modify-style {
    .modify-style-content {
        height: 32vh;
        overflow: auto;
    }
}

.item {
    height: 55px;
}

.event {
    min-height: 34%;
    max-height: 34%;
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
