import { BaseProps } from "./base";
export type SubElement = {
    parent: Element | null;
    children: Map<number, SubElement>;
    style: string;
    type: string;
    el?: HTMLElement | null;
    top: number;
    left: number;
    resizeTop:string;
    resizeLeft:string;
    heidden:boolean;
} & Partial<BaseProps>;

export type element={
    parent:element,
    children:element[],
    id:number,
    event:Function[];
    props:string[],
    style:string,
}
export type plainElement={
    children:element[]
}
export type vnode={
    
}