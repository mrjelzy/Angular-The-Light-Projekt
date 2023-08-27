export interface Order {
    id ?: number;
    guest : string;
    cart : string;
    total : string;
    state : number;
    tracking ?: string;
}