import {useContext} from "react";
import {OrderContext} from "../../../../contexts/order-context";
import {isNil} from "lodash";

const OrderSelector = () => {
    const {table, order, orders, setOrder} = useContext(OrderContext);

    if (!isNil(order) || isNil(table)) {
        return null;
    }

    return <div
        className={"flex flex-col mb-2 p-2 w-full justify-center items-center border rounded-md cursor-pointer"}
    >
        {
            orders?.map((order) => {
                return <div>
                    {order.id}
                    {order.creator.name}
                </div>
            })
        }
    </div>
}

export default OrderSelector;