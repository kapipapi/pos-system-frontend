import {ProductInOrder} from "./product";

export interface Order {
    id: string,
    table_id: number,
    creator_id: number,
    user_id: number,
    created_at: string,
    closed_at?: string,
    active: boolean,
    sum: number,
    products: [ProductInOrder],
}