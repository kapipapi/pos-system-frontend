import {useCallback, useContext, useEffect, useState} from "react";
import {UserContext} from "../../contexts/user-context";
import {Order} from "../../models/order";
import {authFetchDelete, authFetchGet} from "../../hooks/authFetch";
import {useAuth} from "oidc-react";
import {isNil} from "lodash";
import {OrderTile} from "./components/order-tile";
import {TableOrderContext} from "../../contexts/table-order-context";
import {Table} from "../../models/table";
import {useNavigate} from "react-router";
import EmployeeSelector from "./components/employee-selector";
import {Waiter} from "../../models/waiter";

function Orders() {
    const auth = useAuth();
    let token = auth.userData?.access_token;

    const navigate = useNavigate();

    const {usersList, currentUser} = useContext(UserContext);
    const [orders, setOrders] = useState<Order[] | null>(null);

    const {setTable} = useContext(TableOrderContext);

    const [selectedUser, setSelectedUser] = useState<Waiter | undefined>(currentUser);

    const openOrderInMenu = (tableId: string) => {
        authFetchGet<Table>(`orders_view/get_table/${tableId}`, auth.userData?.access_token)
            .then((res) => setTable(res))
            .catch(e => console.error(e));
        navigate("/app/menu");
    }

    const getAllOrders = useCallback(() => {
        if (!isNil(selectedUser)) {
            authFetchGet<Order[]>(`orders_view/get_user_orders/${selectedUser.id}`, token)
                .then((result) => setOrders(result))
                .catch(() => setOrders(null))
        } else {
            authFetchGet<Order[]>(`orders_view/get_all_orders`, token)
                .then((result) => setOrders(result))
                .catch(() => setOrders(null))
        }
    }, [selectedUser, token, setOrders])

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
        <div className={"flex flex-row mt-4"}>
            <h1 className={"text-2xl mr-auto"}>Orders</h1>
            <EmployeeSelector users={usersList} selectedUser={selectedUser} onSelectUser={setSelectedUser}/>
        </div>
        <div className={"grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-4 items-start"}>
            {orders?.map((order) => <OrderTile key={order.id} order={order} onRemove={removeOrder}
                                               selectOrder={openOrderInMenu}/>)}
        </div>
    </div>
}

export default Orders;