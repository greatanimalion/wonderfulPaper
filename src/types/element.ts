import { BaseProps } from "./base";
export type SubElement = {
    parent: Element | null;
    // children: SubElement[];
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