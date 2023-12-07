import {createContext, Dispatch, ReactElement, SetStateAction, useContext, useEffect, useMemo, useState} from "react";
import {Outlet} from "react-router-dom";
import {UserContext} from "./user-context";
import {Order} from "../models/order";
import {Table} from "../models/table";
import {isNil} from "lodash";
import {authFetchGet, authFetchPost} from "../hooks/authFetch";
import {useAuth} from "react-oidc-context";

export type OrderContextType = {
    // table API
    table: Table | null,
    setTable: Dispatch<SetStateAction<Table | null>>,

    // order API
    createOrder: () => void,
    order: Order | null,
    setOrder: Dispatch<SetStateAction<Order | null>>,
    addProductToOrder: (product_id: string) => void,
    removeProductFromOrder: (product_id: string) => void,
}

const defaultOrderContext: OrderContextType = {
    // table API
    table: null,
    setTable: () => {
    },

    // order API
    createOrder: () => {
    },
    order: null,
    setOrder: () => {
    },
    addProductToOrder: () => {
    },
    removeProductFromOrder: () => {
    }
}

export const OrderContext = createContext<OrderContextType>(defaultOrderContext);

export const OrderContextProvider = (): ReactElement => {
    const auth = useAuth();
    let token = auth.user?.access_token;

    const [table, setTable] = useState<Table | null>(null);
    const [order, setOrder] = useState<Order | null>(null);

    const {currentUser} = useContext(UserContext);

    let fetchOrderWithTableID = () => {
        if (!isNil(table) && !isNil(currentUser)) {
            authFetchGet<Order>(`tables/order/${table.id}/${currentUser.id}`, token)
                .then((result) => setOrder(result))
                .catch(() => setOrder(null))
        }
    }
    useEffect(fetchOrderWithTableID, [token, table, currentUser, setOrder]);

    const createOrder = useMemo(() => () => {
        if (!isNil(table) && isNil(order) && !isNil(currentUser)) {
            authFetchPost<Order>("orders", token, {
                table_id: table.id,
                creator_id: currentUser.id
            })
                .then((result) => setOrder(result))
                .catch(() => setOrder(null))
        }
    }, [token, table, order, currentUser, setOrder]);

    const addProductToOrder = (productId: string) => {
        if (!isNil(table) && !isNil(order) && !isNil(currentUser)) {
            void authFetchGet<Order>("add_product_to_order", auth.user?.access_token)
                .then((order) => {
                    console.log("added product")
                    setOrder(order)
                })
                .catch(() => console.error("cannot add product"))
        }
    }

    const removeProductFromOrder = (productId: string) => {
        if (!isNil(table) && !isNil(order) && !isNil(currentUser)) {
            authFetchGet<Order>("remove_product_from_order", auth.user?.access_token)
                .then((order) => {
                    console.log("removed product")
                    setOrder(order)
                })
                .catch(() => console.log("cannot remove product"))
        }
    }

    return <OrderContext.Provider value={{
        // table API
        table,
        setTable,

        // order API
        createOrder,
        order,
        setOrder,
        addProductToOrder,
        removeProductFromOrder
    }}>
        <Outlet/>
    </OrderContext.Provider>
}