import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../contexts/user-context";
import {Order} from "../../models/order";
import {useAuth} from "oidc-react";
import {OrderTile} from "./components/order-tile";
import EmployeeSelector from "./components/employee-selector";
import {Waiter} from "../../models/waiter";
import {authFetchGet} from "../../hooks/authFetch";
import {OrderContext} from "../order-provider/order-provider";

function Orders() {
    const auth = useAuth();
    let token = auth.userData?.access_token;

    const {setOrder} = useContext(OrderContext);

    const {usersList, currentUser} = useContext(UserContext);
    const [selectedUser, setSelectedUser] = useState<Waiter | undefined>(currentUser);

    const [orders, setOrders] = useState<Order[] | null>(null);

    const fetchOrders = () => {
        const endpoint = selectedUser?._id ? `orders/waiter/${selectedUser._id}` : "orders";
        authFetchGet<Order[]>(endpoint, token)
            .then((res) => {
                setOrders(res)
            })
            .catch(e => console.error(e));
    }
    useEffect(fetchOrders, [selectedUser, setOrders, token])


    return <div
        className={"flex flex-col w-full h-full max-h-screen space-y-5 overflow-y-scroll overflow-x-hidden no-scrollbar pr-2"}>
        <div className={"flex flex-row mt-4"}>
            <h1 className={"text-2xl mr-auto"}>Orders</h1>
            <EmployeeSelector users={usersList} selectedUser={selectedUser} onSelectUser={setSelectedUser}/>
        </div>
        <div className={"grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-4 items-start"}>
            {orders?.map((order) => {
                return <OrderTile
                    key={order._id}
                    order={order}
                    selectOrder={(orderId) => setOrder(orderId)}/>
            })}
        </div>
    </div>
}

export default Orders;