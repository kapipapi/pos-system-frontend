import {Outlet} from "react-router";
import {Order} from "../../models/order";
import {createContext, useState} from "react";
import {authFetchGet} from "../../hooks/authFetch";
import {useAuth} from "oidc-react";
import ActiveOrder from "./active-order";

export type OrderContextType = {
    order?: Order,
    setOrder: (orderId: String) => void,
    closeActiveOrder: () => void,
}
const defaultOrderContext: OrderContextType = {
    order: undefined,
    setOrder: () => {
    },
    closeActiveOrder: () => {},
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

    const closeActiveOrder = () => {
        setOrderState(undefined);
    }

    return <OrderContext.Provider value={{
        order: orderState,
        setOrder,
        closeActiveOrder,
    }}>
        <div className={"flex flex-row w-full max-h-screen"}>
            <Outlet/>
            <ActiveOrder/>
        </div>
    </OrderContext.Provider>
}

export default OrderProvider;