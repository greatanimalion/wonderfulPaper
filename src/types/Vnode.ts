import { ElementType } from "@/const/elementType";

export type Vnode = {
    id: number;
    name?: string;
    top: number;
    left: number;
    width: number;
    height: number;
    type: ElementType;
    style: string;
    events: { [key: string]: () => void };
    children: Vnode[];
    parent: Vnode | undefined;
    text: string | undefined;
    lineToParent?: any;
    HTML: HTMLElement | null;
    createElement: () => void;
    createHTML: () => void;
}
export type VnodeOptions = Partial<Vnode>;

export type plainVnode = Vnode[]