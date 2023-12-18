import {useContext} from "react";
import {UserContext} from "../../contexts/user-context";
import {NavLink} from "react-router-dom";
import {BiPowerOff} from "react-icons/bi";
import {BsFillPersonFill} from "react-icons/bs";

export default function SideMenu() {
    const {currentUser, logout} = useContext(UserContext);

    return <div className={"flex flex-col w-full"}>
        <p className={`text-4xl text-white bg-zinc-800 h-12 px-4 p-1 rounded-lg mt-2 mb-8 self-center`}>
            <NavLink to={"/"}>POSPIZZA</NavLink>
        </p>
        {currentUser !== undefined &&
            <ul className={"space-x-4 text-xl ml-10 text-zinc-900"}>
                <NavLink to={`/menu`}
                         className={({isActive}) => isActive ? 'font-bold' : 'font-thin'}>
                    <li>Menu</li>
                </NavLink>
                <NavLink to={`/orders`}
                         className={({isActive}) => isActive ? 'font-bold' : 'font-thin'}>
                    <li>Orders</li>
                </NavLink>
                <NavLink to={"/tables"}
                         className={({isActive}) => isActive ? 'font-bold' : 'font-thin'}>
                    <li>Tables</li>
                </NavLink>
                <NavLink to={"/"}
                         className={({isActive}) => isActive ? 'font-bold' : 'font-thin'}>
                    <li>Reservation</li>
                </NavLink>
                <NavLink to={"/settings"}
                         className={({isActive}) => isActive ? 'font-bold' : 'font-thin'}>
                    <li>Settings</li>
                </NavLink>
            </ul>
        }
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
        </div>
    </div>
}
