import OrderTable from "./components/order-table";
import ProductList from "./components/product-list";
import OrderSummary from "./components/order-summary";
import OrderSelector from "./components/order-selector";
import OrderInfo from "./components/order-info";

function Order() {
    return <div className={"flex flex-col w-96 lg:w-[36rem] m-2 overflow-hidden"}>
        <OrderTable/>

        <OrderSelector/>

        <ProductList/>

        <div className={"mt-auto"}>
            <OrderInfo/>

            <OrderSummary/>
        </div>
    </div>
}

export default Order;