<template>
    <layout></layout>
    <GlobalAlert />
</template>

<script setup lang="ts">
import { provide } from 'vue';
import layout from './layout.vue'
import GlobalAlert from '@/components/Alert.vue'
let captureCb: Function | null = null;
function capture(cb: Function) {
    captureCb = cb;
}
function useCpature(...args: any) {
    captureCb && captureCb(args);
}
provide('capture', capture);
provide('useCpature', useCpature);
</script>

<style scoped></style>