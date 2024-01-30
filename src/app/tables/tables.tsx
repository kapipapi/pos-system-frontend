import React, {FC, useEffect, useState} from "react";
import {Table} from "../../models/table";
import {authFetchGet} from "../../hooks/authFetch";
import {useAuth} from "oidc-react";
import TablesFullGrid from "./tables-grid";

type LevelButtonProps = {
    i: number;
    active: boolean;
    setLevel: (i: number) => void;
}
export const TablesLevelButton: FC<LevelButtonProps> = ({i, active, setLevel}) => {
    return <div onClick={() => setLevel(i)}
                className={`flex py-2 px-4 border rounded cursor-pointer ${active ? "font-bold" : "font-thin"}`}>
        <p>Level {i}</p>
    </div>
}

function Tables() {
    const auth = useAuth();

    const [tables, setTables] = useState<Table[]>([]);
    const [level, setLevel] = useState<number>(0);

    const fetchTables = () => {
        authFetchGet<Table[]>("tables", auth.userData?.access_token)
            .then((res) => setTables(res))
            .catch(e => console.error(e));
    }
    useEffect(fetchTables, [auth, setTables])

    return <div className={"flex flex-col w-full max-h-screen"}>
        <div className={"flex flex-row space-x-4 my-2"}>
            <TablesLevelButton i={0} active={level === 0} setLevel={setLevel}/>
            <TablesLevelButton i={1} active={level === 1} setLevel={setLevel}/>
            <TablesLevelButton i={2} active={level === 2} setLevel={setLevel}/>
        </div>
        <div className={"flex flex-col w-full h-full max-h-screen pr-4"}>
            <TablesFullGrid onTableClick={console.log} tables={tables} level={level}/>
        </div>
    </div>
}

export default Tables;