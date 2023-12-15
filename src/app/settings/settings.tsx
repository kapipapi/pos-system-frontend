import MenuSettings from "./components/menu-settings/menu-settings";
import TablesSettings from "./components/tables-settings/tables-settings";
import {Accordion, AccordionItem} from '@szhsin/react-accordion';
import React from "react";

function Settings() {
    return <div
        className={"flex flex-col w-full h-full max-h-screen space-y-5 overflow-y-scroll overflow-x-hidden no-scrollbar pr-2"}>
        <div className={"flex flex-col w-full space-y-2 mt-2"}>
            <Accordion transition transitionTimeout={250}>
                <AccordionItem header={
                    <div className={"rounded-t p-2 w-full"}>
                        <h1 className={"text-xl font-bold"}>Menu Settings</h1>
                    </div>
                }>
                    <MenuSettings/>
                </AccordionItem>

                <AccordionItem header={
                    <div className={"rounded-t p-2 w-full"}>
                        <h1 className={"text-xl font-bold"}>Tables Settings</h1>
                    </div>
                }>
                    <TablesSettings/>
                </AccordionItem>
            </Accordion>

        </div>
    </div>
}

export default Settings;