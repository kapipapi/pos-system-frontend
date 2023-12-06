import OrderTable from "./components/order-table";
import ProductList from "./components/product-list";
import {useContext} from "react";
import {OrderContext} from "../../../contexts/order-context";
import OrderSummary from "./components/order-summary";
import {BiPlusCircle} from "react-icons/bi";

function Order() {
    const {table, order, createOrder} = useContext(OrderContext);

    return <div className={"flex flex-col w-96 lg:w-[36rem] m-2 overflow-hidden"}>
        <OrderTable/>

        {(!order && table) &&
            <div className={"flex w-full h-full justify-center items-center"}>
                <button onClick={() => createOrder()}
                        className={"p-10 border border-zinc-700 text-zinc-700 rounded-md"}>
                    <p>CREATE ORDER</p>
                    <BiPlusCircle className={"text-2xl mx-auto text-black"}/>
                </button>
            </div>
        }

        <ProductList/>

        <OrderSummary/>
    </div>
}

export default Order;