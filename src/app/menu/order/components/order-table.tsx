import {useContext} from "react";
import {OrderContext} from "../../../../contexts/order-context";
import {useNavigate} from "react-router";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {MdOutlineTableBar} from "react-icons/md";

const OrderTable = () => {
    const {table, setTable, setOrder} = useContext(OrderContext);
    const navigate = useNavigate();


    if (!table) {
        return <div className={"flex flex-col w-full h-full items-center justify-center p-3 mb-2 rounded-md cursor-pointer border"} onClick={() => navigate("/tables")}>
                <MdOutlineTableBar className={"text-4xl mr-3"}/>
                Select table...
            </div>
    }

    return <div className={"flex w-full h-12 p-3 mb-2 rounded-md items-center cursor-pointer border"} onClick={() => {
        setTable(null);
        setOrder(null);
    }}>
        <AiOutlineCloseCircle className={"text-2xl mr-3"}/>
        <p className={"text-xl"}>{table.name}</p>
    </div>
}

export default OrderTable;