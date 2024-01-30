import {redirect, RouteObject} from "react-router-dom";
import AdminPanel from "./admin-panel";
import AdminLayout from "./layout";
import GenericSettings from "./settings/components/generic-settings/generic-table";
import {Waiter} from "../models/waiter";
import {Product} from "../models/product";
import {Table} from "../models/table";
import {Category} from "../models/category";

export let admin_routes: RouteObject = {
    element: <AdminLayout/>,
    path: "/admin",
    children: [
        {
            element: <AdminPanel/>,
            path: "/admin",
        },
        {
            element: <GenericSettings<Waiter> fetchEndpoint={"waiters"}/>,
            path: "/admin/users",
        },
        {
            element: <GenericSettings<Category> fetchEndpoint={"categories"}/>,
            path: "/admin/categories",
        },
        {
            element:  <GenericSettings<Product> fetchEndpoint={"products"}/>,
            path: "/admin/products",
        },
        {
            element: <GenericSettings<Table> fetchEndpoint={"tables"}/>,
            path: "/admin/tables",
        },
        {
            path: "/admin/*",
            loader: () => redirect("/admin"),
        },
    ]
}