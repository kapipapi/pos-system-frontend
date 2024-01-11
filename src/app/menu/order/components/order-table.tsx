import {useContext} from "react";
import {OrderContext} from "../../../../contexts/order-context";
import {useNavigate} from "react-router";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {MdOutlineTableBar} from "react-icons/md";
import {isNil} from "lodash";

const OrderTable = () => {
    const {table, setTable, order, setOrder} = useContext(OrderContext);
    const navigate = useNavigate();

    if (isNil(table)) {
        return <div
            className={"flex flex-col w-full h-full items-center justify-center p-3 mb-2 rounded-md cursor-pointer border"}
            onClick={() => navigate("/app/tables")}>
            <MdOutlineTableBar className={"text-4xl mr-3"}/>
            Select table...
        </div>
    }

    if (isNil(order)) {
        return <div className={"flex w-full h-12 p-3 mb-2 rounded-md items-center cursor-pointer border"} onClick={() => {
            setTable(null);
        }}>
            <AiOutlineCloseCircle className={"text-2xl mr-3"}/>
            <div className={"flex flex-row w-full mx-2 text-md space-x-10"}>
                <span>Table: {table.name}</span>
            </div>
        </div>
    }

    return <div className={"flex w-full h-12 p-3 mb-2 rounded-md items-center cursor-pointer border"} onClick={() => {
        setOrder(null);
    }}>
        <AiOutlineCloseCircle className={"text-2xl mr-3"}/>
        <div className={"flex flex-row w-full mx-2 text-md space-x-10"}>
            <span>Table: {table.name}</span>
            <span>User: {order?.creator.name}</span>
        </div>
    </div>
}

export default OrderTable;