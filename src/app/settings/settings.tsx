import MenuSettings from "./components/menu-settings/menu-settings";
import TablesSettings from "./components/tables-settings/tables-settings";

function Settings() {
    return <div
        className={"flex flex-col w-full h-full max-h-screen space-y-5 overflow-y-scroll overflow-x-hidden no-scrollbar pr-2"}>
        <div className={"flex flex-col w-full space-y-2 mt-2"}>

            <MenuSettings/>

            <TablesSettings/>
            
        </div>
    </div>
}

export default Settings;