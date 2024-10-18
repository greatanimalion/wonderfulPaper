<template>
    <layout></layout>
    <GlobalAlert />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import layout from './layout.vue'
import GlobalAlert from '@/components/Alert.vue'

let muen: HTMLDivElement | null = null;
onMounted(() => {
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
    document.addEventListener('mousedown', function (e) {
        if (e.button === 2) {
            muen = muen || document.querySelector<HTMLDivElement>('#menu-vnode')!
            muen.style.display = 'block'
            muen.style.left = e.clientX + 'px'
            muen.style.top = e.clientY + 'px'
        }
        else {
            setTimeout(() => {
                if (muen) muen.style.display = 'none'
            }, 100)
        }
    })
})
</script>

<style scoped></style>