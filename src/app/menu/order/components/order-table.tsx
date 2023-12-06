import {useContext} from "react";
import {OrderContext} from "../../../../contexts/order-context";
import {useNavigate} from "react-router";
import {AiOutlineCloseCircle} from "react-icons/ai";

const OrderTable = () => {
    const {table, setTable, setOrder} = useContext(OrderContext);
    const navigate = useNavigate();


    if (!table) {
        return <button onClick={() => navigate("/tables")}>
            <div className={"flex w-full h-12 p-3 mb-2 rounded-md border-2 border-zinc-800 font-semibold"}>
                Select table...
            </div>
        </button>
    }

    return <div className={"flex w-full h-12 p-3 mb-2 rounded-md border-2 border-zinc-800"}>
        <p>{table.name}</p>
        <button onClick={() => {
            setTable(null);
            setOrder(null);
        }} className={"ml-auto self-center text-2xl"}>
            <AiOutlineCloseCircle/>
        </button>
    </div>
}

export default OrderTable;