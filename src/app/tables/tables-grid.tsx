import {Table} from "../../models/table";
import React, {FC, ReactElement} from "react";
import classNames from "classnames";
import {isNil} from "lodash";

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
                        _id: "",
                        name: isNil(name) ? `Stolik ${px} ${py}` : name,
                        x: px,
                        y: py,
                        level: pl,
                    })
                }
            }}
            className={classNames("w-full col-span-1 aspect-square border", {
                "hover:bg-zinc-100 cursor-pointer": isSettingsAddActive ?? false,
            })}></div>
    }

    return <div
        onClick={() => onClick(table)}
        className={"flex flex-col w-full bg-zinc-800 text-white rounded-md col-span-1 row-span-1 aspect-square"}>
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
        const {x: px, y: py} = table;
        if ((0 <= px && (px + 1) <= grid_w) &&
            (0 <= py && (py + 1) <= grid_h) &&
            (table.level === level)) {
            grid[grid_w * py + px] =
                <GridCell key={`table_${table.name}`} table={table} onClick={onTableClick} {...options}/>
        }
    }

    return <div className={"grid grid-cols-12"}>{grid}</div>
}

export default TablesFullGrid;