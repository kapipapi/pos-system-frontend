import OrderTable from "./components/order-table";
import ProductList from "./components/product-list";
import OrderSummary from "./components/order-summary";
import OrderSelector from "./components/order-selector";
import OrderInfo from "./components/order-info";
import {TableOrderContext} from "../../../contexts/table-order-context";
import {useContext, useEffect} from "react";
import {Outlet} from "react-router";

function Order() {
    const {fetchFullOrder} = useContext(TableOrderContext);

    useEffect(fetchFullOrder, [fetchFullOrder]);

    return <div className={"flex flex-row w-full max-h-screen"}>
        <Outlet/>
        <div className={"flex flex-col w-96 lg:w-[36rem] m-2 overflow-hidden"}>
            <OrderTable/>

            <OrderSelector/>

            <ProductList/>

            <div className={"mt-auto"}>
                <OrderInfo/>

                <OrderSummary/>
            </div>
        </div>
    </div>
}

export default Order;