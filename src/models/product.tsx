export interface NewProduct {
    name: string,
    price: number,
}

export interface Product {
    _id: string,
    name: string,
    price: number,
}

export interface ProductInOrder {
    _id: string,
    name: string,
    price: number,
    quantity: number,
}