import {NavLink} from "react-router-dom";

const SideMenu = () => {
    const linkFont = ({isActive}: { isActive: boolean }) => isActive ? 'font-extrabold' : '';

    return <div className={"flex flex-col w-full bg-zinc-800"}>
        <ul className={"text-xl ml-10 mt-5 text-bone"}>
            <NavLink to={`/admin/users`} className={linkFont}>
                <li className={"mb-2"}>Users</li>
            </NavLink>
            <NavLink to={`/admin/categories`} className={linkFont}>
                <li className={"mb-2"}>Categories</li>
            </NavLink>
            <NavLink to={`/admin/products`} className={linkFont}>
                <li className={"mb-2"}>Products</li>
            </NavLink>
            <NavLink to={`/admin/tables`} className={linkFont}>
                <li className={"mb-2"}>Tables</li>
            </NavLink>
            <NavLink to={"/app"} className={"font-extralight"}>
                <li className={"mt-4"}>back to App</li>
            </NavLink>
        </ul>
    </div>
}

export default SideMenu;