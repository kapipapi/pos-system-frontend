import {Category} from "./category";

export interface NewProduct {
    name: string,
    price: number,
    category_id: string,
}

export interface Product {
    _id: string,
    name: string,
    price: number,
    category: Category,
}

export interface ProductInOrder {
    _id: string,
    name: string,
    price: number,
    category: Category,
    quantity: number,
}