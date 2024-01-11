import {useContext} from "react";
import {OrderContext} from "../../../../contexts/order-context";
import {isNil} from "lodash";
import {BsReceiptCutoff} from "react-icons/bs";

const OrderSelector = () => {
    const {table, order, orders, createOrder} = useContext(OrderContext);

    if (isNil(table) || !isNil(order) || isNil(orders)) {
        return null;
    }

    return <>
        {orders?.length > 0 && <div
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
        </div>}
        <div
            className={"flex flex-col mb-2 w-full h-full justify-center items-center border rounded-md cursor-pointer"}
            onClick={() => createOrder()}>
            <BsReceiptCutoff className={"text-4xl mb-1 mx-auto text-black"}/>
            <p className={"text-xl"}>CREATE ORDER</p>
        </div>
    </>
}

export default OrderSelector;