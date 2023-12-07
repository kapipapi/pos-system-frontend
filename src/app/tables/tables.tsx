import React, {ReactElement, useContext, useEffect, useState} from "react";
import {Table} from "../../models/table";
import {OrderContext} from "../../contexts/order-context";
import {useNavigate} from "react-router";
import {authFetchGet} from "../../hooks/authFetch";
import {useAuth} from "react-oidc-context";

function Tables() {
    const auth = useAuth();
    const grid_w = 12;
    const grid_h = 8;

    const [level, setLevel] = useState<number>(0);
    const [tables, setTables] = useState<Table[]>([]);

    const {setTable} = useContext(OrderContext);
    const navigate = useNavigate();

    const fetchTables = () => {
        authFetchGet<Table[]>("tables", auth.user?.access_token)
            .then((res) => setTables(res))
            .catch(e => console.error(e));
    }
    useEffect(fetchTables, [auth, setTables])

    const LevelButton = ({i}: { i: number }) => {
        return <div onClick={() => setLevel(i)}
                    className={`flex py-2 px-4 border rounded cursor-pointer ${level === i ? "font-bold" : "font-thin"}`}>
            <p>Level {i}</p>
        </div>
    }

    const GridCell = ({table}: { table?: Table }) => {
        if (!table) {
            return <div className={"w-full col-span-1 aspect-square border"}></div>
        }

        return <div
            onClick={() => {
                setTable(table);
                navigate("/menu")
            }}
            className={`flex flex-col w-full bg-zinc-800 text-white rounded-md cursor-pointer col-span-${table.size_w} row-span-${table.size_h} ${table.size_w === table.size_h ? "aspect-square" : ""}`}>
            <p className={"mt-auto text-center"}>{table.name}</p>
        </div>
    }

    const FullGrid = (): ReactElement => {
        let grid: ReactElement[] = [];
        for (let y = 0; y < grid_w; y++) {
            let row: ReactElement[] = [];
            for (let x = 0; x < grid_h; x++) {
                row.push(<GridCell key={`table_${x}_${y}`}/>)
            }
            grid = grid.concat(row)
        }

        for (const table of tables) {
            const {position_x: px, position_y: py, size_w, size_h} = table;
            if ((0 <= px && (px + size_w) <= grid_w) &&
                (0 <= py && (py + size_h) <= grid_h) &&
                (table.level === level)) {
                grid[grid_w * py + px] = <GridCell key={`table_${table.name}`} table={table}/>
            }
        }

        return <>{grid}</>
    }

    // @ts-ignore
    return <div className={"flex flex-col w-full max-h-screen"}>
        <div className={"flex flex-row space-x-4 my-2"}>
            <LevelButton i={0}/>
            <LevelButton i={1}/>
            <LevelButton i={2}/>
        </div>
        <div className={"flex flex-col w-full h-full max-h-screen pr-4"}>
            <div className={"grid grid-cols-12"}>
                <FullGrid/>
            </div>
        </div>
    </div>
}

export default Tables;