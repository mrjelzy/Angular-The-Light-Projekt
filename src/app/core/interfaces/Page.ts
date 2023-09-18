import { Block } from "./Block";

export interface Page {
    id: number;
    status: string;
    date_created: string;
    date_updated: string;
    title: string;
    meta_title: string;
    description: string;
    meta_description: string;
    content: string;
    slug: string;
    blocks: Block[];
  }
  