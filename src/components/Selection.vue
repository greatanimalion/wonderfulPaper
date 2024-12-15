<template>
    <!-- <select ref="contain" @change="change">
        <option v-for="(item, i) in items" :key="i" :value="item.value">{{ item.key }}</option>
    </select> -->
    <div style="width: 60%;" class="container">
        <div class="currentValue">{{ valueplaceholder }}</div>
        <ul>
            <li @click="change(item.value,item.description)" v-for="(item, i) in items" :key="i" :value="item.value">{{ item.description }}</li>
        </ul>
    </div>

</template>

<script setup lang="ts">
import {ref, useAttrs } from 'vue';
let valueplaceholder=ref('')
valueplaceholder.value=useAttrs().value as string;
defineProps({
    items: {
        type: Array<{
            description: string,
            value: string
        }>,
        default: () => []
    }
})
const onChange = useAttrs().change as (value: string) => void;
function change(value:string,ZNname:string) {
    onChange(value);
    valueplaceholder.value=ZNname;
}
</script>

<style scoped>
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
ul{
    text-align: center;
    background-color: #434343;
    position: absolute;
    width: 100%;
    z-index: 9;
    border-radius:0 0 5px 5px ;
    padding: 2px 0;
    display: none;
}

li{
    line-height: 30px;
    font-size: 14px;
    background-color: #4e4e4e;
    cursor: pointer;
    margin: 3px;
    border-radius: 3px;
}
li:hover{
    background-color: rgb(105, 105, 105);
}
.currentValue {
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    border-radius: 3px; 
    color: rgb(218, 218, 218);
    border-radius: 3px;
    transition: all 0.3s ease;
    background-color: #1a1a1a;
    cursor: pointer;
}
.currentValue:hover {
    background-color: rgb(58, 58, 58);
}
.container{
    position: relative;
    height: 30px;
}
.container:hover ul{
    display: block;
}
.container:hover .currentValue{
    background-color: rgb(58, 58, 58)
}
</style>