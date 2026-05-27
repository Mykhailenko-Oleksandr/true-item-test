import type { Tag } from "./tag";

export interface Snippet {
  _id: string;
  title: string;
  content: string;
  tag: Tag[];
  createdAt: string;
  updatedAt: string;
}
