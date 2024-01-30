import ProductList from "./components/product-list";
import OrderSummary from "./components/order-summary";
import {Outlet} from "react-router";
import {Order} from "../../models/order";
import {createContext, Dispatch, SetStateAction, useState} from "react";
import {authFetchGet} from "../../hooks/authFetch";
import {useAuth} from "oidc-react";

export type OrderContextType = {
    order?: Order,
    setOrder: (orderId: String) => void,
}
const defaultOrderContext: OrderContextType = {
    order: undefined,
    setOrder: () => {
    },
}

export const OrderContext = createContext<OrderContextType>(defaultOrderContext);

function OrderProvider() {
    const auth = useAuth();
    let token = auth.userData?.access_token;

    let [orderState, setOrderState] = useState<Order>();

    const setOrder = (orderId: String) => {
        authFetchGet<Order>(`orders/${orderId}`, token)
            .then((res) => {
                setOrderState(res)
            })
            .catch(e => console.error(e));
    }

    return <OrderContext.Provider value={{
        order: orderState,
        setOrder,
    }}>
        <div className={"flex flex-row w-full max-h-screen"}>
            <Outlet/>
            <div className={"flex flex-col w-96 lg:w-[36rem] m-2 overflow-hidden"}>
                <button className={"flex w-full border"} onClick={() => setOrderState(undefined)}>
                    close
                </button>

                <ProductList/>

                <div className={"mt-auto"}>
                    <OrderSummary/>
                </div>
            </div>
        </div>
    </OrderContext.Provider>
}

export default OrderProvider;