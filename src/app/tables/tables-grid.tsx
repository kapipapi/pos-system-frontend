import {Table} from "../../models/table";
import React, {FC, ReactElement} from "react";

type GridCellProps = {
    table?: Table;
    onClick: (table: Table) => void;
}
const GridCell: FC<GridCellProps> = ({table, onClick}) => {
    if (!table) {
        return <div className={"w-full col-span-1 aspect-square border"}></div>
    }

    return <div
        onClick={() => onClick(table)}
        className={`flex flex-col w-full bg-zinc-800 text-white rounded-md cursor-pointer col-span-${table.size_w} row-span-${table.size_h} ${table.size_w === table.size_h ? "aspect-square" : ""}`}>
        <p className={"mt-auto text-center"}>{table.name}</p>
    </div>
}

type FullGridProps = {
    tables: Table[];
    level: number;
    onTableClick: (table: Table) => void;
}
const TablesFullGrid: FC<FullGridProps> = ({tables, level, onTableClick}) => {
    let grid_h = 8
    let grid_w = 12

    let grid: ReactElement[] = [];
    for (let y = 0; y < grid_w; y++) {
        let row: ReactElement[] = [];
        for (let x = 0; x < grid_h; x++) {
            row.push(<GridCell key={`table_${x}_${y}`} onClick={onTableClick}/>)
        }
        grid = grid.concat(row)
    }

    for (const table of tables) {
        const {position_x: px, position_y: py, size_w, size_h} = table;
        if ((0 <= px && (px + size_w) <= grid_w) &&
            (0 <= py && (py + size_h) <= grid_h) &&
            (table.level === level)) {
            grid[grid_w * py + px] = <GridCell key={`table_${table.name}`} table={table} onClick={onTableClick}/>
        }
    }

    return <div className={"grid grid-cols-12"}>{grid}</div>
}

export default TablesFullGrid;