import {ProductInOrder} from "./product";
import {User} from "./user";
import {TableInOrder} from "./table";

export interface Order {
    id: string,
    table: TableInOrder,
    creator: User,
    products: ProductInOrder[],
}