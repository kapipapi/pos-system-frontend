import ProductList from "./components/product-list";
import OrderSummary from "./components/order-summary";
import {FC, useContext} from "react";
import {OrderContext} from "./order-provider";
import {isNil} from "lodash";
import {CgClose} from "react-icons/cg";

const ActiveOrder = () => {
    const {order, closeActiveOrder} = useContext(OrderContext);

    return <div className={"flex flex-col w-96 lg:w-[36rem] m-2"}>
        <div className={"flex flex-col w-full h-full"}>
            {isNil(order) &&
                <div className={"flex w-full my-auto justify-center"}>
                    <p className={"flex text-2xl font-bold "}>No active order</p>
                </div>
            }

            {!isNil(order) &&
                <>
                    <button onClick={closeActiveOrder}>
                        <div className={"flex w-full border rounded-md p-2 border-zinc-800 items-center mb-2"}>
                            <CgClose className={"text-xl"}/>
                            <p className={"text-xl ml-2"}>{order.waiter.name}</p>
                            <p className={"text-xl ml-auto"}>{order.table.name}</p>
                        </div>
                    </button>

                    <ProductList products={order.products} removeProduct={console.log}/>
                </>
            }
        </div>
        <div className={"mt-auto"}>
            <OrderSummary order={order}/>
        </div>
    </div>
}

export default ActiveOrder;