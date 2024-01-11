import {useContext} from "react";
import {OrderContext} from "../../../../contexts/order-context";
import {isNil} from "lodash";
import {BsReceiptCutoff} from "react-icons/bs";
import {sumupOrder} from "../../../../models/product";

const OrderSelector = () => {
    const {table, order, orders, setOrder, createOrder} = useContext(OrderContext);

    if (isNil(table) || !isNil(order) || isNil(orders)) {
        return null;
    }

    return <>
        {orders?.length > 0 && <div
            className={"flex flex-col mb-2 gap-1 w-full"}
        >
            <span className={"text-left"}>Orders on table:</span>
            {
                orders?.map((order) => {
                    return <div
                        onClick={() => setOrder(order)}
                        className={"flex flex-row p-2 h-12 justify-between items-center w-full border rounded-md cursor-pointer"}
                    >
                        <span>{order.creator.name}</span>
                        <span>{sumupOrder(order.products).toFixed(2)} zł</span>
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