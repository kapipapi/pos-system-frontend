import {Outlet} from "react-router";
import {Order} from "../../models/order";
import {createContext, useContext, useState} from "react";
import {authFetchGet, authFetchPost} from "../../hooks/authFetch";
import {useAuth} from "oidc-react";
import ActiveOrder from "./active-order";
import {UserContext} from "../../contexts/user-context";

export type OrderContextType = {
    order?: Order,
    setOrder: (orderId: String) => void,
    createOrder: (tableId: String) => void,
    closeActiveOrder: () => void,
    addProductToOrder: (productId: String) => void,
    removeProductFromOrder: (productId: String) => void,
}
const defaultOrderContext: OrderContextType = {
    order: undefined,
    setOrder: () => {
    },
    createOrder: () => {
    },
    closeActiveOrder: () => {
    },
    addProductToOrder: () => {
    },
    removeProductFromOrder: () => {
    }
}

export const OrderContext = createContext<OrderContextType>(defaultOrderContext);

function OrderProvider() {
    const auth = useAuth();
    let token = auth.userData?.access_token;

    let {currentUser} = useContext(UserContext);

    let [orderState, setOrderState] = useState<Order>();

    const setOrder = (orderId: String) => {
        authFetchGet<Order>(`orders/${orderId}`, token)
            .then((res) => {
                setOrderState(res)
            })
            .catch(e => console.error(e));
    }

    const createOrder = (tableId: String) => {
        authFetchPost<Order>('orders', token, {
            waiter_id: currentUser?._id,
            table_id: tableId,
        }).then(res => {
            setOrder(res._id);
        })
    }

    const closeActiveOrder = () => {
        authFetchGet<Boolean>(`orders/${orderState?._id}/check-empty`, token)
            .then(res => {
                if (res) {
                    console.log("Order empty - closed")
                }
            })

        setOrderState(undefined);
    }

    const addProductToOrder = (productId: String) => {
        authFetchPost<Order>(`orders/${orderState?._id}/add-product`, token, {
            product_id: productId,
        }).then(res => {
            setOrderState(res);
        })
    }

    const removeProductFromOrder = (productId: String) => {
        authFetchPost<Order>(`orders/${orderState?._id}/remove-product`, token, {
            product_id: productId,
        }).then(res => {
            setOrderState(res);
        })
    }

    return <OrderContext.Provider value={{
        order: orderState,
        setOrder,
        createOrder,
        closeActiveOrder,
        addProductToOrder,
        removeProductFromOrder,
    }}>
        <div className={"flex flex-row w-full max-h-screen"}>
            <Outlet/>
            <ActiveOrder/>
        </div>
    </OrderContext.Provider>
}

export default OrderProvider;