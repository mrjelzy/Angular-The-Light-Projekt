export interface Product {
    id: number;
    status: string;
    date_created: string;
    date_updated: string;
    title: string;
    description: string;
    meta_description: string;
    meta_title: string;
    meta_keywords: string;
    size_eye: number;
    size_bridge: number;
    size_temple: number;
    material: string;
    stock: boolean;
    rx: boolean;
    slug: string;
    price: number;
    discount: number | null;
    thumbnail: string;
    alt_thumbnail: string;
    collection_relation: number;
    attributes_relation: number[];
    images: number[];
}