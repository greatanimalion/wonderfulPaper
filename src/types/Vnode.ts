import { ElementType } from "@/const/elementType";

export type Vnode = {
    id: number;
    name?: string;

    top: number;
    left: number;
    width: number;
    height: number;
    absoluteTop: number;
    absoluteLeft: number;

    type: ElementType;
    style: string;
    events: { [key: string]: () => void };

    children: Vnode[];
    parent: Vnode | undefined;
    
    text: string | undefined;
    lineToParent?: any;

    HTML: HTMLElement | null;
    vHTML: HTMLElement | null;

    renderVnodeToNode: Function;
    createHTML: Function;
}
export type VnodeOptions = Partial<Vnode>;

export type plainVnode = Vnode[]