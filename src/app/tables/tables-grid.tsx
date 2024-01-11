import {Table} from "../../models/table";
import React, {FC, ReactElement} from "react";
import classNames from "classnames";
import {isNil, repeat} from "lodash";

type GridCellProps = {
    table?: Table;
    onClick: (table: Table) => void;
    isSettingsTable?: boolean;
    isSettingsAddActive?: boolean;
    position_x?: number;
    position_y?: number;
    position_level?: number;
}
const GridCell: FC<GridCellProps> = ({
                                         table,
                                         onClick,
                                         isSettingsTable,
                                         isSettingsAddActive,
                                         position_x,
                                         position_y,
                                         position_level
                                     }) => {
    if (!table) {
        return <div
            onClick={() => {
                if (isSettingsAddActive) {
                    let px = position_x ?? 0;
                    let py = position_y ?? 0;
                    let pl = position_level ?? 0;

                    let name = prompt("Podaj nazwę stolika:", `Stolik ${px} ${py}`);

                    onClick({
                        id: "",
                        name: isNil(name) ? `Stolik ${px} ${py}` : name,
                        position_x: px,
                        position_y: py,
                        size_w: 1,
                        size_h: 1,
                        level: pl,
                        orders: [],
                    })
                }
            }}
            className={classNames("w-full col-span-1 aspect-square border", {
                "hover:bg-zinc-100 cursor-pointer": isSettingsAddActive ?? false,
            })}></div>
    }

    return <div
        onClick={() => onClick(table)}
        className={classNames(`flex flex-col w-full bg-zinc-800 text-white rounded-md col-span-${table.size_w} row-span-${table.size_h}`, {
            "aspect-square": table.size_w === table.size_h,
            "cursor-pointer": !isSettingsTable ?? false,
        })}>
        <div className={"flex flex-row flex-wrap gap-1 m-1"}>
            {table.orders.map((order) => {
                return <div
                    className={"w-5 bg-bone rounded-full aspect-square text-sm text-zinc-800 text-center items-center"}>
                    {order.creator.name[0]}
                </div>
            })}
        </div>
        <p className={"mt-auto text-center"}>{table.name}</p>
    </div>
}

type FullGridProps = {
    tables: Table[];
    level: number;
    onTableClick: (table: Table) => void;
    options?: {
        isSettingsTable: boolean;
        isSettingsAddActive: boolean;
    };
}
const TablesFullGrid: FC<FullGridProps> = ({tables, level, onTableClick, options}) => {
    let grid_h = 8
    let grid_w = 12

    let grid: ReactElement[] = [];
    for (let y = 0; y < grid_h; y++) {
        let row: ReactElement[] = [];
        for (let x = 0; x < grid_w; x++) {
            row.push(<GridCell key={`table_${x}_${y}`} onClick={onTableClick} position_x={x} position_y={y}
                               position_level={level} {...options}/>)
        }
        grid = grid.concat(row)
    }

    for (const table of tables) {
        const {position_x: px, position_y: py, size_w, size_h} = table;
        if ((0 <= px && (px + size_w) <= grid_w) &&
            (0 <= py && (py + size_h) <= grid_h) &&
            (table.level === level)) {
            grid[grid_w * py + px] =
                <GridCell key={`table_${table.name}`} table={table} onClick={onTableClick} {...options}/>
        }
    }

    return <div className={"grid grid-cols-12"}>{grid}</div>
}

export default TablesFullGrid;