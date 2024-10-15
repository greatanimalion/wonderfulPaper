<template>
    <div class="mask">
        <div v-if="type === 'js'" class="write js">
            书写js脚本
        </div>
        <div v-if="type === 'css'" class="write css">
            书写css样式
        </div>
        <div v-else="type === 'animation'" class="write animation">
            书写动画效果
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    type: {
        type: String,
        default: 'js'
    }
})
</script>

<style scoped>
.mask {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3)
}

.write {
    position: fixed;
    width: 400px;
    min-height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(228, 228, 228);
}
</style>