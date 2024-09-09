import { BaseProps } from "./base";
export type SubElement = {
    parent: Element | null;
    children: SubElement[];
    style: string;
    type: string;
    el?: HTMLElement | null;
    top: number;
    left: number;
    resizeTop:string;
    resizeLeft:string;
    heidden:boolean;
} & Partial<BaseProps>;