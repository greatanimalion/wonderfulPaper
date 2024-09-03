import { defineStore } from "pinia";
import { ButtonProps } from "@/types/button";
import someAtttributeObject from "@/utils/someAtttributeObject";
import { defaultBtn } from "@/const/element";

const useButtonStore = defineStore("buttonProps", {
  state: () => defaultBtn,
  getters: {
    getBtnAttrAll(state: any) {
      return () => someAtttributeObject(Object.keys(defaultBtn), state);
    }
  },
  actions: {
    changeBtnAttr(key: keyof ButtonProps, value: string): void {
      this[key] = value;
    },
    recovery(): void {
      this.$reset();
    },
  },
});
export default useButtonStore;