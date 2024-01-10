import classNames from "classnames";
import {DynamicIcon} from "../../../admin/settings/components/categories-settings/dynamic-icon";
import {Category} from "../../../models/category";

type Prop = {
    category: Category,
    active: boolean,
    onClick: (id: string) => void,
}

function TileCategory({category, active, onClick}: Prop) {
    return <button
        className={classNames("flex flex-col aspect-tile p-4 text-zinc-800 rounded-md")}
        style={{backgroundColor: category.color}}
        onClick={() => onClick(category.id)}>
        <div className={classNames("self-start rounded-full p-3", {"bg-zinc-600": !active, "bg-zinc-800": active})}>
            <DynamicIcon name={category.icon} className={classNames("text-3xl text-white")}/>
        </div>
        <div className={"mt-auto text-left"}>
            <p className={classNames("text-xl", {"font-bold": active})}>{category.name}</p>
        </div>
    </button>
}

export default TileCategory;
