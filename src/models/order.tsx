import {Waiter} from "./waiter";
import {ProductInOrder} from "./product";
import {Table} from "./table";

export interface Order {
    _id: string,
    waiter: Waiter,
    table: Table,
    products: ProductInOrder[],
    sum: number,
    created_at: Date,
}