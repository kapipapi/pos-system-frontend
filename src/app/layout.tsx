import SideMenu from "./side-menu/side-menu";
import {Outlet} from "react-router";

function AppLayout() {
    return (
        <div className={`flex flex-row`}>
            <div className={"flex w-80 min-h-screen fixed"}>
                <SideMenu/>
            </div>
            <main className="flex w-full min-h-screen ml-80">
                <Outlet/>
            </main>
        </div>
    )
}

export default AppLayout;