import SideMenu from "./side-menu/side-menu";
import {Outlet} from "react-router";

function RootLayout() {
    return (
        <div className={`flex flex-row`}>
            <div className={"flex w-80 min-h-screen"}>
                <SideMenu/>
            </div>
            <main className="flex w-full min-h-screen">
                <Outlet/>
            </main>
        </div>
    )
}

export default RootLayout;