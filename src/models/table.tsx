
export interface Table {
    id: string,
    name: string,
    level: number,
    position_x: number,
    position_y: number,
    size_w: number,
    size_h: number,
    has_order: boolean,
}

export interface TableInOrder {
    id: string,
    name: string,
}