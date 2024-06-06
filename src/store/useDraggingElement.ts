import { defineStore } from "pinia";


 const useDraggingElement = defineStore("draggingElement", {
  state: () => ({
    curElement: "",//响应式
  }),
  actions: {
    setDraggingElement(element: any) {
      this.curElement = element;//this指store实例
    },
    clearDraggingElement() {
      this.curElement = "";
    },
  },
});
export  default useDraggingElement;