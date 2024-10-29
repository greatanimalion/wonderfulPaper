<template>
    <div class="MaterialSide">
        <div style="padding:1px 0 5px 0;text-align: center;">
            <div class="layerBOX"><img src="" class="layerThumbnail"></div>
        </div>
        <div class="selectBox">
            <v-tabs v-model="active" align-tabs="center" color="deep-red-accent-4" >
                <v-tab style="width:33.3%;" value="BasicComponents">基本元素</v-tab>
                <v-tab style="width:33.3%;" value="AdvancedComponents">封装组件</v-tab>
                <v-tab style="width:33.3%;" value="PremiumContainers">高级容器</v-tab>
            </v-tabs>
        </div>
        <div class="componentBox">
            <keep-alive>
                     <component   :is="tabs[active]"></component>
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

.MaterialSide {
    height: calc(100vh - 62px);
    display: flex;
    flex-direction: column;
    gap: 0px;
    overflow: auto;
}

.selectBox {
    height: 40px;
    .v-btn{
        min-width: 0!important;
    }
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
    padding:0 5px;
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