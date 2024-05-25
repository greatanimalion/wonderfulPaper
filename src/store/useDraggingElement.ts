import { defineStore } from "pinia";


 const useDraggingElement = defineStore("draggingElement", {
  state: () => ({
    curElement: "",
  }),
  actions: {
    setDraggingElement(element: any) {
      this.curElement = element;
    },
    clearDraggingElement() {
      this.curElement = "";
    },
  },
});
export  default useDraggingElement;