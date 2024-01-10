import {
    createContext,
    Dispatch,
    ReactElement,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState
} from "react";
import {Outlet} from "react-router-dom";
import {UserContext} from "./user-context";
import {Order} from "../models/order";
import {Table} from "../models/table";
import {isNil} from "lodash";
import {authFetchGet, authFetchPost} from "../hooks/authFetch";
import {useAuth} from "oidc-react";
import {useNavigate} from "react-router";

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
    let token = auth.userData?.access_token;

    const navigate = useNavigate();

    const [table, setTable] = useState<Table | null>(null);
    const [order, setOrder] = useState<Order | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);

    const {currentUser} = useContext(UserContext);

    const userIsSet = !isNil(currentUser);
    const tableIsSet = !isNil(table);
    const orderIsSet = !isNil(order);

    let fetchFullOrder = useCallback(() => {
        if (tableIsSet && userIsSet) {
            authFetchGet<Order[]>(`order_context/orders/table/${table.id}`, token)
                .then((result) => {
                    setOrders(result)
                    if (result.length === 1) {
                        setOrder(result[0])
                    }
                })
                .catch(() => {
                    setOrder(null)
                    setOrders([])
                })
        }
    }, [tableIsSet, userIsSet, table, token, setOrders])
    useEffect(fetchFullOrder, [fetchFullOrder]);

    const createOrder = () => {
        if (tableIsSet && !orderIsSet && userIsSet) {
            authFetchPost<Order>(`order_context/orders/table/${table.id}`, token, {
                creator_id: currentUser.id
            })
                .then((result) => setOrder(result))
                .catch(() => setOrder(null))
        }
    }

    const addProductToOrder = (product_id: string) => {
        if (!tableIsSet) navigate("/app/tables");

        if (tableIsSet && orderIsSet && userIsSet) {
            authFetchPost<Order>(`order_context/order/${order.id}/add_product`, token, {
                product_id: product_id
            })
                .then((order) => setOrder(order))
                .catch((err) => console.error("cannot add product:", err))
        }
    }

    const removeProductFromOrder = (product_id: string) => {
        if (tableIsSet && orderIsSet && userIsSet) {
            authFetchPost<Order>(`order_context/order/${order.id}/remove_product`, token, {
                product_id: product_id
            })
                .then((order) => setOrder(order))
                .catch((err) => console.error("cannot remove product", err))
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