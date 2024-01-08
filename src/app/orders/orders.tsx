import {useCallback, useContext, useEffect, useState} from "react";
import {UserContext} from "../../contexts/user-context";
import {Order} from "../../models/order";
import {authFetchDelete, authFetchGet} from "../../hooks/authFetch";
import {useAuth} from "oidc-react";
import {isNil} from "lodash";
import {OrderTile} from "./components/order-tile";
import {OrderContext} from "../../contexts/order-context";
import {Table} from "../../models/table";
import {useNavigate} from "react-router";

function Orders() {
    const auth = useAuth();
    let token = auth.userData?.access_token;

    const navigate = useNavigate();

    const {currentUser} = useContext(UserContext);
    const [orders, setOrders] = useState<Order[] | null>(null);

    const {setTable} = useContext(OrderContext);

    const openOrderInMenu = (tableId: string) => {
        authFetchGet<Table>(`orders_view/get_table/${tableId}`, auth.userData?.access_token)
            .then((res) => setTable(res))
            .catch(e => console.error(e));
        navigate("/menu");
    }

    const getAllOrders = useCallback(() => {
        if (!isNil(currentUser)) {
            authFetchGet<Order[]>(`orders_view/get_user_orders/${currentUser.id}`, token)
                .then((result) => setOrders(result))
                .catch(() => setOrders(null))
        }
    }, [currentUser, token, setOrders])

    useEffect(() => {
        getAllOrders();
    }, [getAllOrders]);

    const removeOrder = (orderId: string) => {
        authFetchDelete<string>(`orders_view/remove_order/${orderId}`, token)
            .then(() => {
                getAllOrders();
            })
            .catch((e) => console.log("Order not removed, reason:", e));
    }

    return <div
        className={"flex flex-col w-full h-full max-h-screen space-y-5 overflow-y-scroll overflow-x-hidden no-scrollbar pr-2"}>
        <div className={"mt-4"}>
            <h1 className={"text-2xl"}>Orders</h1>
        </div>
        <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4 items-start"}>
            {orders?.map((order) => <OrderTile key={order.id} order={order} onRemove={removeOrder} selectOrder={openOrderInMenu}/>)}
        </div>
    </div>
}

export default Orders;