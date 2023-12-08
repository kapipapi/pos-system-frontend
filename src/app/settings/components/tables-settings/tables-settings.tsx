import TablesFullGrid from "../../../tables/tables-grid";
import {useAuth} from "react-oidc-context";
import React, {useEffect, useState} from "react";
import {Table} from "../../../../models/table";
import {authFetchGet} from "../../../../hooks/authFetch";
import {TablesLevelButton} from "../../../tables/tables";
import {FaPlus} from "react-icons/fa";

const TablesSettings = () => {
    const auth = useAuth();

    const [tables, setTables] = useState<Table[]>([]);
    const [level, setLevel] = useState<number>(0);

    const fetchTables = () => {
        authFetchGet<Table[]>("tables", auth.user?.access_token)
            .then((res) => setTables(res))
            .catch(e => console.error(e));
    }
    useEffect(fetchTables, [auth, setTables])

    return (
        <div className={"flex flex-col w-full border p-2"}>
            <div className={"flex flex-col mb-2"}>
                <h1 className={"text-xl font-bold mb-2"}>Tables Settings</h1>
                <div className={"flex flex-row space-x-4 items-center"}>
                    <TablesLevelButton i={0} active={level === 0} setLevel={setLevel}/>
                    <TablesLevelButton i={1} active={level === 1} setLevel={setLevel}/>
                    <TablesLevelButton i={2} active={level === 2} setLevel={setLevel}/>
                    <div className={"border-l h-full mx-2"}></div>
                    <button className={"flex py-2 px-4 border rounded cursor-pointer items-center"}>
                        <FaPlus className={"mr-2"}/>
                        Add table
                    </button>
                </div>
            </div>
            <TablesFullGrid
                tables={tables}
                level={level}
                onTableClick={(id) => console.log(id)}
            />
        </div>
    );
}

export default TablesSettings;