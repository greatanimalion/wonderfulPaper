import { defineStore } from "pinia";
import { LayerThumbnail } from "@/types/LayerThumbnail";
import { Layer_Img_Width } from "@/const";
let id = 0;

const useLayerThumbnail = defineStore("LayerThumbnail", {
    state: () => ({
        canvas: [],
    } as { canvas: LayerThumbnail[] }),
    actions: {
        setLayerThumbnail(canvas: Omit<LayerThumbnail, "id">) {
            id += 1;
            (canvas.width > canvas.height ? (() => {
                canvas.height = canvas.height / canvas.width * Layer_Img_Width
                canvas.width = Layer_Img_Width
            }) : (() => {
                canvas.width = canvas.width / canvas.height * Layer_Img_Width
                canvas.height = Layer_Img_Width
            }))();
            this.canvas.push(Object.assign({ id }, canvas));
        },
        deleteLayerThumbnail(id: number) {
            for (let i of this.canvas) { if (i.id === id) { window.URL.revokeObjectURL(i.url); } }
            this.canvas = this.canvas.filter(item => item.id !== id);

        }
    }
})
export default useLayerThumbnail;