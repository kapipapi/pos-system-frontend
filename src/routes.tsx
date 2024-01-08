import {createBrowserRouter, redirect} from "react-router-dom";
import Logout from "./logout";
import {app_routes} from "./app/route";
import {admin_routes} from "./admin/route";

export let routes = createBrowserRouter([
    {
        index: true,
        path: "/",
        loader: () => redirect("/app")
    },
    app_routes,
    admin_routes,
    {
        element: <Logout/>,
        path: "/logout",
    },
    {
        path: "*",
        loader: () => redirect("/app"),
    },
]);