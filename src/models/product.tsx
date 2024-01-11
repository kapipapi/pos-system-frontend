import {Category} from "./category";

export interface ProductInOrder {
    id: string,
    name: string,
    price: number,
    tax: number,
    category: Category,
    quantity: number,
}

export function sumupOrder(products: ProductInOrder[]): number {
    return products.reduce((sum, orderItem) => {
        return sum + (orderItem.price * orderItem.quantity);
    }, 0);
}


export interface NewProduct {
    name: string,
    price: number,
    tax: number,
    category: string,
    description: String,
}

export interface Product {
    id: string,
    name: string,
    price: number,
    tax: number,
    category: Category,
    description: String,
    image?: Blob,
}