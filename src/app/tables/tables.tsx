import React, {FC, useContext, useEffect, useState} from "react";
import {Table} from "../../models/table";
import {authFetchGet} from "../../hooks/authFetch";
import {useAuth} from "oidc-react";
import TablesFullGrid from "./tables-grid";
import {Order} from "../../models/order";
import ReactModal from "react-modal";
import {OrderContext} from "../order-provider/order-provider";

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
    let token = auth.userData?.access_token;

    const {setOrder, closeActiveOrder} = useContext(OrderContext);

    const [tables, setTables] = useState<Table[]>([]);
    const [level, setLevel] = useState<number>(0);

    const fetchTables = () => {
        authFetchGet<Table[]>("tables", token)
            .then((res) => setTables(res))
            .catch(e => console.error(e));
    }
    useEffect(fetchTables, [auth, setTables, token])

    const fetchOrders = (table_id: String) => {
        authFetchGet<Order[]>(`orders/table/${table_id}`, token)
            .then((res) => {
                if (res.length === 1) {
                    setOrder(res[0]._id);
                }
                if (res.length > 1) {
                    closeActiveOrder();
                    setModalIsOpen(true);
                }
            })
            .catch(e => console.error(e));
    }

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    return <div className={"flex flex-col w-full max-h-screen"}>
        <ReactModal isOpen={modalIsOpen} shouldCloseOnOverlayClick={true} onRequestClose={() => setModalIsOpen(false)}>
            <div className={"flex flex-col w-full text-center"}>
                <p className={"text-2xl"}>Select order on table</p>
            </div>
        </ReactModal>
        <div className={"flex flex-row space-x-4 my-2"}>
            <TablesLevelButton i={0} active={level === 0} setLevel={setLevel}/>
            <TablesLevelButton i={1} active={level === 1} setLevel={setLevel}/>
            <TablesLevelButton i={2} active={level === 2} setLevel={setLevel}/>
        </div>
        <div className={"flex flex-col w-full h-full max-h-screen pr-4"}>
            <TablesFullGrid onTableClick={fetchOrders} tables={tables} level={level}/>
        </div>
    </div>
}

export default Tables;