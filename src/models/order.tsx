import {ProductInOrder} from "./product";
import {User} from "./user";

export interface Order {
    id: string,
    table_id: string,
    creator: User,
    products: ProductInOrder[],
}