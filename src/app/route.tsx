import {UserContextProvider} from "../contexts/user-context";
import AppLayout from "./layout";
import Home from "./home/home";
import AuthGuard from "./auth";
import Menu from "./menu/menu";
import Tables from "./tables/tables";
import Orders from "./orders/orders";
import {RouteObject} from "react-router-dom";
import OrderProvider from "./order-provider/order-provider";
import Reservations from "./reservations/reservations";

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
                            element: <OrderProvider/>,
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
                        },
                        {
                            element: <Reservations/>,
                            path: "/app/reservations",
                        }
                    ]
                },
            ],
        }
    ]
}