import {useContext} from "react";
import {TableOrderContext} from "../../../../contexts/table-order-context";
import {isNil} from "lodash";

const OrderInfo = () => {
    const {table, order} = useContext(TableOrderContext);

    if (isNil(table) || isNil(order)) {
        return null;
    }

    if (isNil(order.info)) {
        return <div className={"flex w-full border p-2 rounded-md mb-1 cursor-pointer"}>
            Add info...
        </div>;
    }

    return <div className={"flex w-full border p-2 rounded-md mb-1 cursor-pointer"}>
        {order.info}
    </div>
}

export default OrderInfo;