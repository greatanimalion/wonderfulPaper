import { defineStore } from "pinia";

const usePageStore = defineStore("pages", {
    state: () => ({
        width: "",
        heigth: "",
        scale: 1,
        created: false
    }),
    actions: {
        init(width: string, heigth: string) {

            this.width = width + "px";
            this.heigth = heigth + "px";
            this.created = true;
        },
        setScale(scale: number) {
            this.scale = scale;
        }
    }
})

export default usePageStore;