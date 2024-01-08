import {NavLink} from "react-router-dom";

const SideMenu = () => {
    const linkFont = ({isActive}: { isActive: boolean }) => isActive ? 'font-bold' : '';

    return <div className={"flex flex-col w-full bg-zinc-800"}>
        <ul className={"text-xl ml-10 mt-5 text-bone"}>
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
}

export default SideMenu;