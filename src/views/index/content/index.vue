<template>
    <div class="show-content">
        <div class="add-page">
            <div>
                <PlusSquareOutlined :style="{ fontSize: '100px', color: '#1890ff', cursor: 'pointer' }" />
                <div style="text-align: center;font-size: 18px;"></div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { PlusSquareOutlined } from '@ant-design/icons-vue';




</script>

<style scoped lang="scss">
.show-content {
    padding: 10px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    overflow-x: scroll;

    &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #999;
        border-radius: 4px;
    }
}

.add-page {
    justify-content: center;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
}

.content {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    background-color: rgb(255, 255, 255);
    width: 720px;
    height: 900px;
    position: relative;
    margin: auto;
}
</style>