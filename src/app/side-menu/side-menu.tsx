import {useContext} from "react";
import {UserContext} from "../../contexts/user-context";
import {NavLink} from "react-router-dom";
import {BiPowerOff} from "react-icons/bi";
import {BsFillPersonFill} from "react-icons/bs";
import {useAuth} from "oidc-react";
import {checkRole} from "../../auth";
import FontLogo from "../../FontLogo";

export default function SideMenu() {
    const auth = useAuth();
    const {currentUser, logout} = useContext(UserContext);

    const linkFont = ({isActive}: { isActive: boolean }) => isActive ? 'font-bold' : 'font-thin';

    return <div className={"flex flex-col w-full"}>
        <NavLink to={"/"} className={"mt-2 mb-8 mx-auto"}>
            <FontLogo/>
        </NavLink>
        <ul className={"space-x-4 text-xl ml-10 text-zinc-900"}>
            {currentUser !== undefined &&
                <>
                    <NavLink to={`/app/menu`} className={linkFont}>
                        <li>Menu</li>
                    </NavLink>
                    <NavLink to={`/app/orders`} className={linkFont}>
                        <li>Orders</li>
                    </NavLink>
                    <NavLink to={"/app/tables"} className={linkFont}>
                        <li>Tables</li>
                    </NavLink>
                    <NavLink to={"/app"} className={linkFont}>
                        <li>Reservation</li>
                    </NavLink>
                    <NavLink to={"/admin"} className={linkFont}>
                        <li>Settings</li>
                    </NavLink>
                </>
            }
        </ul>
        <div className={"mt-auto flex flex-col mx-5 mb-5"}>
            <button onClick={() => logout()}>
                <div
                    className={"flex flex-row text-white p-1 text-base bg-zinc-800 border border-zinc-800 rounded-full pr-3 items-center"}>
                    <div
                        className={"flex bg-white text-zinc-800 h-8 text-xs mr-2 items-center justify-center aspect-square rounded-full"}>
                        {currentUser ? <BiPowerOff className={"text-2xl"}/> : <BsFillPersonFill className={"text-xl"}/>}
                    </div>
                    <p>{currentUser?.name ?? "No user logged in."}</p>
                </div>
            </button>
            {checkRole(auth.userData) &&
                <NavLink to={"/admin"} className={'self-center font-thin mt-1 -mb-4'}>
                    <p>Admin Panel</p>
                </NavLink>
            }
        </div>
    </div>
}
