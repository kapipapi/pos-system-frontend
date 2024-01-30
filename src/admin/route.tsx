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
            element: <GenericSettings<Waiter> fetchEndpoint={"waiters"} default_values={{
                _id: "",
                name: "",
            }}/>,
            path: "/admin/users",
        },
        {
            element: <GenericSettings<Category> fetchEndpoint={"categories"} default_values={{
                _id: "",
                name: "",
                icon: "",
                color: "",
            }}/>,
            path: "/admin/categories",
        },
        {
            element: <GenericSettings<Product> fetchEndpoint={"products"} default_values={{
                _id: "",
                name: "",
                price: 0,
            }}/>,
            path: "/admin/products",
        },
        {
            element: <GenericSettings<Table> fetchEndpoint={"tables"} default_values={{
                _id: "",
                name: "",
                x: 0,
                y: 0,
                level: 0,
            }}/>,
            path: "/admin/tables",
        },
        {
            path: "/admin/*",
            loader: () => redirect("/admin"),
        },
    ]
}