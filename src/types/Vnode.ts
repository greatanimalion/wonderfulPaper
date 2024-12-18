export  type ElementType="div"|"button" | "textarea" | "audio" | "form" | "label" | "link" | "table" | "video" | "img" | "input" | "checkbox" | "radio" | "span";

export interface Vnode  {
    id: number;
    name: string;
    //dom的位置
    top: number;
    left: number;
    width: number;
    height: number;
    //vdom的位置
    vTop: number;
    vLeft: number;
    vWidth: number;
    vHeight: number;
    
    type: ElementType;
    style: string;
    events: { [key: string]: () => void };
    drag: boolean;

    children: Vnode[];
    parent: Vnode | null;
    
    lineToParent?: any;

    HTML: HTMLDivElement | null;
    vHTML: HTMLElement | null;
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