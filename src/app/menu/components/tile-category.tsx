import classNames from "classnames";
import {categoryBgColor} from "../../categories-styles";
import {DynamicIcon} from "../../../admin/settings/components/categories-settings/dynamic-icon";

type Prop = {
    id: string,
    name: string,
    icon: string,
    active: boolean,
    onClick: (id: string) => void,
}

function TileCategory({id, name, icon, active, onClick}: Prop) {

    return <button
        className={classNames("flex flex-col aspect-tile p-4 text-zinc-800 rounded-md", categoryBgColor(name))}
        onClick={() => onClick(id)}>
        <div className={"self-start"}>
            <DynamicIcon name={icon} className={"text-3xl"}/>
        </div>
        <div className={"mt-auto text-left"}>
            <p className={classNames("text-xl font-normal", {"font-bold": active})}>{name}</p>
        </div>
    </button>
}

export default TileCategory;
