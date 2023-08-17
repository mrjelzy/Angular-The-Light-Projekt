import { Product } from "./Product";
import { Option } from "./Option";
import { Attribute } from "./Attribute";

export interface Configuration {
    id: string;
    directusId ?: number;
    product: Product;
    attributes?: Attribute[];
    options?: Option[];
    is_prescription?: boolean;
}