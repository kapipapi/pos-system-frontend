import {ProductInOrder} from "./product";

export interface Order {
    id: string,
    table_id: string,
    creator_id: string,
    products: ProductInOrder[],
}