import { nextTick, Ref } from "vue";

export default function drawGrid(canvas: Ref<HTMLCanvasElement>) {
    nextTick(() => {
    const ctx = canvas.value.getContext('2d')!;
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
    canvas.value.style.position = 'absolute';
    canvas.value.style.top = '0';
    canvas.value.style.left = '0';
    const cellSize=20
    const numRows = canvas.value.height / cellSize ;
    const numCols =canvas.value.width / cellSize;
    ctx.lineWidth = 1;
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
    });
}