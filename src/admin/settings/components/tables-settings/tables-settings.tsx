import TablesFullGrid from "../../../../app/tables/tables-grid";
import {useAuth} from "oidc-react";
import React, {useEffect, useState} from "react";
import {Table} from "../../../../models/table";
import {authFetchGet, authFetchPost} from "../../../../hooks/authFetch";
import {TablesLevelButton} from "../../../../app/tables/tables";
import {FaPlus} from "react-icons/fa";
import classNames from "classnames";

const TablesSettings = () => {
    const auth = useAuth();

    const [tables, setTables] = useState<Table[]>([]);
    const [level, setLevel] = useState<number>(0);
    const [addTableActive, setAddTableActive] = useState<boolean>(false);

    const fetchTables = () => {
        authFetchGet<Table[]>("admin/tables", auth.userData?.access_token)
            .then((res) => setTables(res))
            .catch(e => console.error(e));
    }
    useEffect(fetchTables, [auth, setTables])

    const postTable = (newTable: Table) => {
        authFetchPost<Table[]>("admin/tables", auth.userData?.access_token, newTable)
            .then((res) => setTables(res))
            .catch(e => console.error(e));
    }

    return (
        <div className={"flex flex-col w-full p-2"}>
            <div className={"flex flex-col mb-2"}>
                <div className={"flex flex-row space-x-4 items-center"}>
                    <TablesLevelButton i={0} active={level === 0} setLevel={setLevel}/>
                    <TablesLevelButton i={1} active={level === 1} setLevel={setLevel}/>
                    <TablesLevelButton i={2} active={level === 2} setLevel={setLevel}/>
                    <div className={"border-l h-full mx-2"}></div>
                    <button className={classNames("flex py-2 px-4 border rounded cursor-pointer items-center")}
                            onClick={() => setAddTableActive(prevState => !prevState)}>
                        <FaPlus className={classNames("transition mr-2", {"rotate-45": addTableActive})}/>
                        {!addTableActive ? "Add table" : "Cancel edition"}
                    </button>
                </div>
            </div>
            <TablesFullGrid
                tables={tables}
                level={level}
                onTableClick={(newTable) => {
                    if (newTable.id !== "") {
                        return;
                    }

                    setAddTableActive(false);

                    postTable(newTable);
                }}
                options={{
                    isSettingsTable: true,
                    isSettingsAddActive: addTableActive,
                }}
            />
        </div>
    );
}

export default TablesSettings;