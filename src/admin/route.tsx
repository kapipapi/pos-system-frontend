import {redirect, RouteObject} from "react-router-dom";
import AdminPanel from "./admin-panel";
import AdminLayout from "./layout";
import CategoriesSettings from "./settings/components/categories-settings/categories-settings";
import ProductsSettings from "./settings/components/products-settings/products-settings";
import TablesSettings from "./settings/components/tables-settings/tables-settings";
import UsersSettings from "./settings/components/users-settings/users-settings";

export let admin_routes: RouteObject = {
    element: <AdminLayout/>,
    path: "/admin",
    children: [
        {
            element: <AdminPanel/>,
            path: "/admin",
        },
        {
            element: <UsersSettings/>,
            path: "/admin/users",
        },
        {
            element: <CategoriesSettings/>,
            path: "/admin/categories",
        },
        {
            element: <ProductsSettings/>,
            path: "/admin/products",
        },
        {
            element: <TablesSettings/>,
            path: "/admin/tables",
        },
        {
            path: "/admin/*",
            loader: () => redirect("/admin"),
        },
    ]
}