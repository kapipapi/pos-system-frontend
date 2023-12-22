import classNames from "classnames";
import {categoryBgColor, CategoryIcon} from "../../categories";

type Prop = {
    id: string,
    name: string,
    active: boolean,
    onClick: (id: string) => void,
}

function TileCategory({id, name, active, onClick}: Prop) {

    return <button
        className={classNames("flex flex-col aspect-tile p-4 text-zinc-800 rounded-md", categoryBgColor(name))}
        onClick={() => onClick(id)}>
        <div className={"self-start"}>
            <CategoryIcon name={name}/>
        </div>
        <div className={"mt-auto text-left"}>
            <p className={classNames("text-xl font-normal", {"font-bold": active})}>{name}</p>
        </div>
    </button>
}

export default TileCategory;
