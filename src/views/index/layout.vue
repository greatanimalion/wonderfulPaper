<template>
    <div class="layout">
        <div class="material">
            <div class="logo"><span ref="logo">wonderful</span>Paper</div>
            <Material></Material>
        </div>
        <div class="workspace">
            <FunctionBar></FunctionBar>
            <Editor></Editor>
        </div>
        <div class="config">
            <ElementConfig></ElementConfig>
        </div>
    </div>
    <Vnode v-show="showVnode"></Vnode>
    <Menu></Menu>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Material from './material/index.vue';
import ElementConfig from './elementConfig/index.vue';
import Editor from './editor/index.vue';
import colorFont from 'colorfontcolor';
import FunctionBar from './functionBar/index.vue';
import Vnode from "./vnode/index.vue"
import Menu from '@/components/Menu.vue';
import { setFn } from '@/utils/busEventFns'
import usePageStore from '@/store/usePageStore';
import Alert from '@/utils/defineAlert';
const pageStore = usePageStore()
const logo = ref('logo')
const showVnode = ref(false)
/**
 * 打开vnode
 * @param e 如果有e，跳过控制，直接返回当前开关信息
*/
function openVnode(e?: boolean) {
    if (!e) showVnode.value = !showVnode.value
    return showVnode.value
}
onMounted(() => {
    colorFont(logo.value, { duration: 3, color: ['#a7a7a7', '#9efb7d', '#fb7def', '#7dc0fb'] })
    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key == 'q') {
            if (!pageStore.created) return Alert('error','请先创建页面！')
            openVnode()
        }
    })
    setFn('openVnode', openVnode)
})


</script>
<style scoped lang="scss">
.layout {
    height: 100vh;
    width: 100vw;
    display: flex;
    .workspace {
        width:calc(100vw - 500px);
        background-color: #ffffff;
    }

    .config {
        min-width: 250px;
        flex-basis: 0;
    }

    .material {
        min-width: 250px;
        flex-basis: 0;
    }
}

.logo {
    color: var(--difine-font-color-light);
    text-align: center;
    font-size: 20px;
    height: 55px;
    line-height: 55px;
    background: var(--bg-color);
}

hr {
    border: 0.5px solid #444444;
}
</style>