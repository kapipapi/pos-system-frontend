import {createBrowserRouter} from "react-router-dom";
import RootLayout from "./app/layout";
import Home from "./app/home/home";
import Menu from "./app/menu/menu";
import AuthGuard from "./app/auth";
import {OrderContextProvider} from "./contexts/order-context";
import Tables from "./app/tables/tables";
import Settings from "./app/settings/settings";
import {UserContextProvider} from "./contexts/user-context";
import Orders from "./app/orders/orders";

export let routes = createBrowserRouter([
    {
        element: <UserContextProvider/>,
        path: "/",
        children: [
            {
                element: <RootLayout/>,
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
                                        path: "/menu",
                                        element: <Menu/>,
                                    },
                                    {
                                        index: true,
                                        path: "/tables",
                                        element: <Tables/>,
                                    },
                                ]
                            },
                            {
                                index: true,
                                path: "/settings",
                                element: <Settings/>,
                            },
                            {
                                index: true,
                                path: "/orders",
                                element: <Orders/>,
                            },
                        ]
                    },
                ],
            }
        ]
    },
]);