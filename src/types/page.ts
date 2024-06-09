export type Page = {
  id: number;
  width: string;
  height: string;
  title?: string;
  content?: string;
  zIndex: string;
  pageElements:HTMLElement[];
};