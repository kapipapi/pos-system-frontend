export interface ProductInOrder {
    id: string,
    name: string,
    price: number,
    tax: number,
    category: string,
    quantity: number,
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
    category: string,
    description: String,
    image?: Blob,
}