import React, {FC, useContext, useEffect, useState} from "react";
import {Table} from "../../models/table";
import {OrderContext} from "../../contexts/order-context";
import {authFetchGet} from "../../hooks/authFetch";
import {useAuth} from "react-oidc-context";
import TablesFullGrid from "./tables-grid";
import {useNavigate} from "react-router";

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
    const navigate = useNavigate();

    const [tables, setTables] = useState<Table[]>([]);
    const [level, setLevel] = useState<number>(0);

    const {setTable} = useContext(OrderContext);

    const fetchTables = () => {
        authFetchGet<Table[]>("tables_view/get_all_tables", auth.user?.access_token)
            .then((res) => setTables(res))
            .catch(e => console.error(e));
    }
    useEffect(fetchTables, [auth, setTables])

    const onTableClick = (table: Table) => {
        setTable(table);
        navigate("/menu");
    }

    return <div className={"flex flex-col w-full max-h-screen"}>
        <div className={"flex flex-row space-x-4 my-2"}>
            <TablesLevelButton i={0} active={level === 0} setLevel={setLevel}/>
            <TablesLevelButton i={1} active={level === 1} setLevel={setLevel}/>
            <TablesLevelButton i={2} active={level === 2} setLevel={setLevel}/>
        </div>
        <div className={"flex flex-col w-full h-full max-h-screen pr-4"}>
            <TablesFullGrid onTableClick={onTableClick} tables={tables} level={level}/>
        </div>
    </div>
}

export default Tables;