import PaymentMethods from "./payment-methods";
import {useContext} from "react";
import {OrderContext} from "../../../../contexts/order-context";
import {isNil} from "lodash";

const OrderSummary = () => {
    const {table, order} = useContext(OrderContext);

    return <div className={"flex flex-col mt-auto p-4 rounded-md bg-zinc-800 text-white"}>
        <div className={"flex flex-row"}>
            <p className={"text-xl"}>Total:</p>
            {(!isNil(table) && !isNil(order)) &&
                <p className={"ml-auto text-xl font-bold"}>{order.sum.toFixed(2)} zł</p>
            }
        </div>
        <div className={"border-b-2 border-dashed my-3 border-zinc-400"}></div>
        {!isNil(table) && <PaymentMethods/>}
        <button disabled={isNil(table)}
                className={`bg-white text-zinc-950 rounded-full w-4/5 p-2 py-3 my-3 self-center disabled:text-gray-400`}>
            Place order
        </button>
    </div>
}

export default OrderSummary;