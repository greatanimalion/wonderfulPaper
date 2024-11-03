<template>
    <select ref="contain" @change="change">
        <option v-for="(item, i) in items" :key="i" :value="item.value">{{ item.key }}</option>
    </select>
</template>

<script setup lang="ts">
import { ref, useAttrs } from 'vue';
const items = useAttrs().items as {
    key: string;
    value: string;
}[];
const onChange=useAttrs().change as (value: string) => void;

const contain=ref();
function change() {  
    onChange(items[contain.value!.selectedIndex].value);
}
</script>

<style scoped lang="scss">
select {
    outline: none;
    width: 67%;
    border-radius: 2px;
    padding: 0 5px;
    background-color: #1A1A1A;
    font-size: 12px;
    height: 30px;
    text-align: center;

}
</style>