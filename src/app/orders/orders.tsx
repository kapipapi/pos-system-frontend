import {useCallback, useContext, useEffect, useState} from "react";
import {UserContext} from "../../contexts/user-context";
import {Order} from "../../models/order";
import {authFetchGet, authFetchPost} from "../../hooks/authFetch";
import {useAuth} from "react-oidc-context";
import {isNil} from "lodash";
import {OrderTile} from "./components/order-tile";
import {OrderContext} from "../../contexts/order-context";
import {Table} from "../../models/table";
import {useNavigate} from "react-router";

function Orders() {
    const auth = useAuth();
    let token = auth.user?.access_token;

    const navigate = useNavigate();

    const {currentUser} = useContext(UserContext);
    const [orders, setOrders] = useState<Order[] | null>(null);

    const {setTable} = useContext(OrderContext);

    const selectOrder = (tableId: string) => {
        authFetchGet<Table>(`tables/${tableId}`, auth.user?.access_token)
            .then((res) => setTable(res))
            .catch(e => console.error(e));
        navigate("/menu");
    }

    const getAllOrders = useCallback(() => {
        if (!isNil(currentUser)) {
            authFetchGet<Order[]>("orders", token)
                .then((result) => setOrders(result))
                .catch(() => setOrders(null))
        }
    }, [currentUser, token, setOrders])

    useEffect(() => {
        getAllOrders();
    }, [getAllOrders]);

    const removeOrder = (orderId: string) => {
        authFetchPost<string>(`orders/${orderId}/remove`, token, {})
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
        <div className={"grid grid-cols-4 w-full gap-4 items-start"}>
            {orders?.map((order) => <OrderTile order={order} onRemove={removeOrder} selectOrder={selectOrder}/>)}
        </div>
    </div>
}

export default Orders;