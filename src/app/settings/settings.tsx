import ProductsSettings from "./components/products-settings/products-settings";
import TablesSettings from "./components/tables-settings/tables-settings";
import {Accordion, AccordionItem} from '@szhsin/react-accordion';
import React, {FC, ReactElement} from "react";
import {FaChevronDown} from "react-icons/fa6";
import classNames from "classnames";
import CategoriesSettings from "./components/categories-settings/categories-settings";

function Settings() {

    type ItemProps = {
        name: string;
        children: ReactElement;
        initialEntered?: boolean;
    }
    const Item: FC<ItemProps> = ({name, children, initialEntered}) => {
        return <AccordionItem
            className={"border rounded-md p-1"}
            initialEntered={initialEntered ?? false}
            buttonProps={{
                className: ({isEnter}) => "flex w-full p-1 items-center"
            }}
            header={(state) => {
                let isOpen = state.state.isEnter;
                return <>
                    {name}
                    <FaChevronDown className={classNames("transition ml-auto", {"rotate-180": isOpen})}/>
                </>

            }}>
            {children}
        </AccordionItem>
    }

    return <div
        className={"flex flex-col w-full h-full max-h-screen overflow-y-scroll overflow-x-hidden no-scrollbar p-2"}>
        <Accordion transition transitionTimeout={250} className={"space-y-3"}>
            <Item name={"Categories Settings"} initialEntered>
                <CategoriesSettings/>
            </Item>

            <Item name={"Menu Settings"}>
                <ProductsSettings/>
            </Item>

            <Item name={"Tables Settings"}>
                <TablesSettings/>
            </Item>
        </Accordion>
    </div>
}

export default Settings;