import {redirect, RouteObject} from "react-router-dom";
import AdminPanel from "./admin-panel";
import AdminLayout from "./layout";
import GenericSettings from "./settings/components/generic-settings/generic-table";
import {NewWaiter, Waiter} from "../models/waiter";
import {NewProduct, Product} from "../models/product";
import {NewTable, Table} from "../models/table";
import {Category, NewCategory} from "../models/category";

export let admin_routes: RouteObject = {
    element: <AdminLayout/>,
    path: "/admin",
    children: [
        {
            element: <AdminPanel/>,
            path: "/admin",
        },
        {
            element: <GenericSettings<Waiter, NewWaiter> fetchEndpoint={"waiters"} default_values={{
                name: "",
                code: "",
            }}/>,
            path: "/admin/users",
        },
        {
            element: <GenericSettings<Category, NewCategory> fetchEndpoint={"categories"} default_values={{
                name: "",
                icon: "",
                color: "",
            }}/>,
            path: "/admin/categories",
        },
        {
            element: <GenericSettings<Product, NewProduct> fetchEndpoint={"products"} default_values={{
                name: "",
                price: 0,
            }}/>,
            path: "/admin/products",
        },
        {
            element: <GenericSettings<Table, NewTable> fetchEndpoint={"tables"} default_values={{
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