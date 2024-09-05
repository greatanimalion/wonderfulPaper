<template>
    <input v-model="modelValue" autocomplete="off" class="input" :placeholder="placeHolder"  >
</template>

<script setup lang="ts">

const modelValue=defineModel()
defineProps({
    placeHolder: {
        type: String,
        default: "请输入内容"
    },
})


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