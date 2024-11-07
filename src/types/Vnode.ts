import { ElementType } from "@/const/elementType";

export interface Vnode  {
    id: number;
    name: string;
    //dom的位置
    top: number;
    left: number;
    width: number;
    height: number;
    //节点的位置
    vTop: number;
    vLeft: number;
    vWidth: number;
    vHeight: number;
    
    type: ElementType;
    style: string;
    events: { [key: string]: () => void };
    drag: boolean;

    children: Vnode[];
    parent: Vnode | undefined;
    
    lineToParent?: any;

    HTML: HTMLElement | null;
    vHTML: HTMLElement | null;

    renderVnodeToNode: Function;
    createHTML: Function;
}
export type VnodeOptions = Partial<Vnode>;

export type plainVnode = Vnode[]

export type LayoutType={
    name:string,
    type:string,
    style:Record<string,string>,
    text?:string,
    sub?:LayoutType[]
}