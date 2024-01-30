import {ProductInOrder} from "./product";
import {Waiter} from "./waiter";
import {TableInOrder} from "./table";

export interface Order {
    id: string,
    table: TableInOrder,
    creator: Waiter,
    products: ProductInOrder[],
    info?: String,
}