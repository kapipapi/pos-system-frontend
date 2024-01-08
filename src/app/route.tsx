import {UserContextProvider} from "../contexts/user-context";
import AppLayout from "./layout";
import Home from "./home/home";
import AuthGuard from "./auth";
import {OrderContextProvider} from "../contexts/order-context";
import Menu from "./menu/menu";
import Tables from "./tables/tables";
import Orders from "./orders/orders";
import {RouteObject} from "react-router-dom";

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
                            element: <OrderContextProvider/>,
                            children: [
                                {
                                    index: true,
                                    path: "/app/menu",
                                    element: <Menu/>,
                                },
                                {
                                    index: true,
                                    path: "/app/tables",
                                    element: <Tables/>,
                                },
                                {
                                    index: true,
                                    path: "/app/orders",
                                    element: <Orders/>,
                                },
                            ]
                        },
                    ]
                },
            ],
        }
    ]
}