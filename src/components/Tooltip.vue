<template>
    <a-tooltip placement="bottom">
        <template #title>
            <span> {{ title }}</span>
        </template>
        <slot></slot>
    </a-tooltip>
</template>

<script setup lang="ts">
defineProps({
    title:{
        type:String,
    }
})

// defineSlots()
</script>

<style scoped></style>