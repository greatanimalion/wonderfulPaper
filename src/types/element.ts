import { BaseProps } from "./base";
export type SubElement = {
    parent: Element | null;
    children: Element[];
    style: string;
    el?: HTMLElement | null;
} & Partial<BaseProps>;