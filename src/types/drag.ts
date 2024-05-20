export interface Draggable {
  startDrag: (event: MouseEvent) => void;
  endDrag: () => void;
}