import {NavLink} from "react-router-dom";

const SideMenu = () => {
    const linkFont = ({isActive}: { isActive: boolean }) => isActive ? 'font-bold' : '';

    return <div className={"flex flex-col w-full bg-zinc-800"}>
        <ul className={"ml-10 mt-5 text-bone space-y-3"}>
            <div>
                <h3 className={"text-xl"}>Dashboard</h3>
                <ul className={"ml-4 text-lg list-disc"}>
                    <NavLink to={`/admin`} className={linkFont}>
                        <li>Overview</li>
                    </NavLink>
                </ul>
            </div>

            <div>
                <h3 className={"text-xl"}>Settings</h3>
                <ul className={"ml-4 text-lg list-disc"}>
                    <NavLink to={`/admin/users`} className={linkFont}>
                        <li>Users</li>
                    </NavLink>
                    <NavLink to={`/admin/categories`} className={linkFont}>
                        <li>Categories</li>
                    </NavLink>
                    <NavLink to={`/admin/products`} className={linkFont}>
                        <li>Products</li>
                    </NavLink>
                    <NavLink to={`/admin/tables`} className={linkFont}>
                        <li>Tables</li>
                    </NavLink>
                </ul>
            </div>

            <NavLink to={"/app"} className={"font-extralight"}>
                <li className={"mt-4"}>back to App</li>
            </NavLink>
        </ul>
    </div>
}

export default SideMenu;