<template>
      <div class="v-combo-box">
            <span>{{ label }}:</span>
            <input v-if="items.length ==0"  :type="handleType(key)" :value="modelValue" @blur="blur" @focus="focus" />
            <Selection :change="change" v-else :items="items" style="width: 60%;"/>
      </div>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue';
import { useBlur, useType } from '@/hooks/useBlur';
import Selection from '@/components/Selection.vue';

let key = useAttrs().keyName as string;
const handleBlur = useBlur();
const handleType = useType();

function focus() {
      // document.querySelector<HTMLDivElement>('.select-list')!.style.display = 'block';
}
function blur(event: any) {
      // document.querySelector<HTMLDivElement>('.select-list')!.style.display = 'none';
      handleBlur(event.target.value, key)
}
function change(value: string) {
      handleBlur(value, key)
}

defineProps({
      modelValue: {
            type: String,
            default: ''
      },
      label: {
            type: String,
            default: ''
      },
      items:{
            type: Array,
            default:[]
      }
})
</script>

<style scoped lang="scss">
.v-combo-box {
      width: 240px;
      height: 30px;
      margin: 5px 0;
      display: flex;
      span {
            font-size: 14px;
            width: 40%;
            text-align: center;
            color: rgb(203, 203, 203);
            line-height: 30px;
            margin-right: 5px;
      }
      input{
            font-size: 14px;
            height: 30px;
            width: 60%;
            border: none;
            border-radius: 3px;
            background-color: #1a1a1a;
            color: rgb(218, 218, 218);
            transition: all 0.3s ease;
            text-align: center;
            &:focus,
            &:hover {
                  outline: none;
                  background-color: rgb(58, 58, 58)
            }
      }
}
</style>