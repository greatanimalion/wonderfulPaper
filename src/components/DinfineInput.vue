<template>
    <input @input="$emit('update:modelValue',($event.target as any).value )" autocomplete="off" class="input" :placeholder="placeHolder"  >
</template>

<script setup lang="ts">
defineProps({
    placeHolder: {
        type: String,
        default: "请输入内容"
    },
    modelValue: {   
        type: String,
    }
})


defineEmits<{
  (e: 'update:modelValue' ,width: number): void
}>()
// function getRef() {
//     return inputRef.value
// }
// //使用setup的情况下这个时候我们无法使用this，注意在setup中setup是封闭的，不会将子组件事件暴露出来
// defineExpose({
//     getRef
// })


</script>

<style scoped>
.input {
    width: 77%;
    height: 40px;
    margin:5px 20px;
    padding:7px 12px;
    border: none;
    border-radius: 4px;
    box-shadow: 2px 2px 7px 0 rgb(0, 0, 0, 0.2);
    color: white;
    transition: all 0.3s;
}

.input:focus {
    animation: justshake 0.8s forwards;
    box-shadow: 0 0 5px 0 rgba(194, 191, 191, 0.5);
}

@keyframes justshake {
    25% {
        background-color: rgb(52, 52, 52)
    }

    100% {
        background-color:#121212
    }
}
</style>