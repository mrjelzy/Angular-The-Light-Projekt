import { Block } from "./Block";

export interface Page {
    id: number;
    status: string;
    date_created: string;
    date_updated: string;
    title: string;
    description: string;
    meta_title: string;
    meta_description: string;
    meta_keywords : string;
    content: string;
    slug: string;
    blocks: Block[];
  }
  