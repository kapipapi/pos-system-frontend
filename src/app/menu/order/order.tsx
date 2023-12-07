import OrderTable from "./components/order-table";
import ProductList from "./components/product-list";
import OrderSummary from "./components/order-summary";

function Order() {
    return <div className={"flex flex-col w-96 lg:w-[36rem] m-2 overflow-hidden"}>
        <OrderTable/>

        <ProductList/>

        <OrderSummary/>
    </div>
}

export default Order;