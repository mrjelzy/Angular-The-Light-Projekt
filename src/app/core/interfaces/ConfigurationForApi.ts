export interface ConfigurationForApi{
    id ?: number;
    product ?: number;
    is_prescription ?: boolean;
    options_relations ?: number[];
    attributes_relations ?: number[]
}