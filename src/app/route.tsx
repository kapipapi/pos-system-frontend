import {UserContextProvider} from "../contexts/user-context";
import AppLayout from "./layout";
import Home from "./home/home";
import AuthGuard from "./auth";
import {TableOrderContextProvider} from "../contexts/table-order-context";
import Menu from "./menu/menu";
import Tables from "./tables/tables";
import Orders from "./orders/orders";
import {RouteObject} from "react-router-dom";
import Order from "./menu/order/order";

export let app_routes: RouteObject = {
    element: <UserContextProvider/>,
    path: "/app",
    children: [
        {
            element: <AppLayout/>,
            children: [
                {
                    index: true,
                    element: <Home/>,
                },
                {
                    element: <AuthGuard/>,
                    children: [
                        {
                            element: <TableOrderContextProvider/>,
                            children: [
                                {
                                    element: <Order/>,
                                    children: [
                                        {
                                            path: "/app/menu",
                                            element: <Menu/>,
                                        },
                                        {
                                            path: "/app/tables",
                                            element: <Tables/>,
                                        },
                                        {
                                            path: "/app/orders",
                                            element: <Orders/>,
                                        },
                                    ]
                                }
                            ]
                        },
                    ]
                },
            ],
        }
    ]
}