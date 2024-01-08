import {Outlet} from "react-router";
import FontLogo from "../FontLogo";
import SideMenu from "./side-menu";

function AdminLayout() {
    return (
        <div className={"flex flex-col"}>
            <div className={"flex border-b items-center p-2 ml-6"}>
                <FontLogo ext={"ADMIN"}/>
            </div>
            <div className={`flex flex-row`}>
                <div className={"flex w-80 min-h-screen"}>
                    <SideMenu/>
                </div>
                <main className="flex w-full min-h-screen">
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}

export default AdminLayout;