<template>
    <div class="drag-component">
        <div class="drag-component-border">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style  lang="scss">
   .drag-component {
        position: fixed;
        .drag-component-border {
            border: 1px dashed #a7a7a7;
            padding: 0px;
        }
    }
</style>