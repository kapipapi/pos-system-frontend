import {Order} from "./order";

export interface Table {
    id: string,
    name: string,
    level: number,
    position_x: number,
    position_y: number,
    size_w: number,
    size_h: number,
    orders: Order[],
}

export interface TableInOrder {
    id: string,
    name: string,
}