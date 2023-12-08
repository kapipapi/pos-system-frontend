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
import {useAuth} from "react-oidc-context";
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
    let token = auth.user?.access_token;

    const navigate = useNavigate();

    const [table, setTable] = useState<Table | null>(null);
    const [order, setOrder] = useState<Order | null>(null);

    const {currentUser} = useContext(UserContext);

    const userIsSet = !isNil(currentUser);
    const tableIsSet = !isNil(table);
    const orderIsSet = !isNil(order);

    let fetchOrderWithTableID = useCallback(() => {
        if (tableIsSet && userIsSet) {
            authFetchGet<Order>(`tables/order/${table.id}/${currentUser.id}`, token)
                .then((result) => setOrder(result))
                .catch(() => setOrder(null))
        }
    }, [tableIsSet, userIsSet, table, currentUser, token])

    useEffect(fetchOrderWithTableID, [fetchOrderWithTableID]);

    const createOrder = () => {
        if (tableIsSet && !orderIsSet && userIsSet) {
            authFetchPost<Order>("orders", token, {
                table_id: table.id,
                creator_id: currentUser.id
            })
                .then((result) => setOrder(result))
                .catch(() => setOrder(null))
        }
    }

    const addProductToOrder = (product_id: string) => {
        if (!tableIsSet) {
            navigate("/tables");
        }

        if (tableIsSet && orderIsSet && userIsSet) {
            authFetchPost<Order>(`orders/${order.id}/add/${product_id}`, token, {})
                .then((order) => setOrder(order))
                .catch((err) => console.error("cannot add product:", err))
        }
    }

    const removeProductFromOrder = (product_id: string) => {
        if (tableIsSet && orderIsSet && userIsSet) {
            authFetchPost<Order>(`orders/${order.id}/remove/${product_id}`, token, {})
                .then((order) => setOrder(order))
                .catch((err) => console.log("cannot remove product", err))
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