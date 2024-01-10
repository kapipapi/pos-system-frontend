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

    return <div className={"flex w-full h-10 p-3 mb-2 rounded-md items-center cursor-pointer border"} onClick={() => {
        setTable(null);
        setOrder(null);
    }}>
        <AiOutlineCloseCircle className={"text-2xl mr-3"}/>
        <div className={"flex flex-row"}>
            <div className={"flex flex-row items-center mx-2"}>
                <span className={"text-sm font-extralight mr-1"}>Stolik:</span>
                <span className={"text-xl"}>{table.name}</span>
            </div>
            <div className={"flex flex-row items-center mx-2"}>
                <span className={"text-sm font-extralight mr-1"}>Kelner:</span>
                <span className={"text-xl"}>{order?.creator.name}</span>
            </div>
        </div>
    </div>
}

export default OrderTable;