import { BaseProps } from "./base";
export type Element = {
    parent: Element | null;
    children: Element[];
    style: string;
} & BaseProps;