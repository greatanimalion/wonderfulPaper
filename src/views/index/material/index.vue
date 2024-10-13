<template>
    <div class="MaterialSide">
        <div style="padding: 5px 0;text-align: center;">
            <!-- <div style="margin: 10px 3px 20px 3px;text-align: center;color: aliceblue;">缩略图</div> -->
            <div class="layerBOX"><img src="" class="layerThumbnail"></div>
        </div>
        <div class="selectBox">
            <a-radio-group v-model:value="active" size="large">
                <a-radio-button value="BasicComponents" style="color: #a9a9a9;">基本组件</a-radio-button>
                <a-radio-button value="AdvancedComponents" style="color: #a9a9a9;">封装组件</a-radio-button>
                <a-radio-button value="PremiumContainers" style="color: #a9a9a9;">高级容器</a-radio-button>
            </a-radio-group>
        </div>
        <div class="componentBox">
            <keep-alive>
                <component :is="tabs[active]"></component>
            </keep-alive>
        </div>
    </div>
</template>

<script setup lang="ts">
import PremiumContainers from './components/PremiumContainers.vue';
import BaseComponents from './components/BaseComponents.vue';
import AdvancedComponents from './components/AdvancedComponents.vue';
import { ref } from 'vue';
const active = ref<keyof typeof tabs>('BasicComponents');
const tabs = {
    BasicComponents: BaseComponents,
    PremiumContainers: PremiumContainers,
    AdvancedComponents: AdvancedComponents,
};
</script>

<style lang="scss" scoped>
.componentBox {
    margin-top: 10px;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #999;
        border-radius: 4px;
    }
}
.MaterialSide{
    height:calc(100vh - 62px);
    display: flex;
    flex-direction: column;
    gap:0px;
    overflow: auto;
}
.selectBox {
    text-align: center;
    height: 40px;
}

.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    color: #ffffff !important;
}

.ant-radio-group {
    background-color: #605f5f;
    width: 100%;

    .ant-radio-button-wrapper {
        background-color: #333333;
        border-radius: 0;
        width: 33.3%;
        font-size: 12px;
        // font-family: ;
        color: var(--difine-font-color-light)!important;
    }
}

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

.layerBOX {
    height: 110px;
    width: 98%;
    outline: #6b6b6b solid 1px;
    margin: auto;
    border-radius: 2px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        max-width: 100%;
        max-height: 100%;
    }
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