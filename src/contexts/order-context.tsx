import {createContext, Dispatch, ReactElement, SetStateAction, useContext, useEffect, useMemo, useState} from "react";
import {Outlet} from "react-router-dom";
import {UserContext} from "./user-context";
import {Order} from "../models/order";
import {Table} from "../models/table";
import {isNil} from "lodash";
import {authFetchGet} from "../hooks/authFetchGet";
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

    const [table, setTable] = useState<Table | null>(null);
    const [order, setOrder] = useState<Order | null>(null);

    const {currentUser} = useContext(UserContext);

    useEffect(() => {
        if (!isNil(table) && !isNil(currentUser)) {
            console.log(`invoke get order_id for table (${table.id}) for user (${currentUser.id})`)
            authFetchGet<Order>("get_order_by_table_id", auth.user?.access_token)
                .then((result) => {
                    console.log("order set", result)
                    setOrder(result)
                })
                .catch((err) => {
                    console.error("error", err)
                    setOrder(null)
                })
        }
    }, [auth, table, currentUser, setOrder]);

    const createOrder = useMemo(() => () => {
        if (!isNil(table) && isNil(order) && !isNil(currentUser)) {
            authFetchGet<Order>("create_order", auth.user?.access_token)
                .then((result) => setOrder(result))
                .catch(() => setOrder(null))
        }
    }, [auth, table, order, currentUser, setOrder]);

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