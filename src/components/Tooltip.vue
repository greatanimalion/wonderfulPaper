<template>
    <div>
        <v-tooltip theme="light" activator="parent" location="bottom">{{ title }}</v-tooltip>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">


defineProps({
    title: {
        type: String,
    }
})

</script>

<style scoped></style>