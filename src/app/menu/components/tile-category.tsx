import {FaGlassWater, FaPizzaSlice} from "react-icons/fa6";
import {FaCoffee} from "react-icons/fa";
import classNames from "classnames";

type Prop = {
    id: string,
    name: string,
    active: boolean,
    onClick: (id: string) => void,
    color: string,
}

function TileCategory({id, name, color, active, onClick}: Prop) {

    const Icon = () => {
        switch (name?.toUpperCase()) {
            case "COFFEE":
                return <FaCoffee className={"text-4xl"}/>;
            case "NAPOJE":
                return <FaGlassWater className={"text-3xl"}/>;
            case "PIZZA":
                return <FaPizzaSlice className={"text-3xl"}/>;
            default:
                return <p>"ICON"</p>;
        }
    }

    return <button
        className={classNames("flex flex-col aspect-tile p-4 text-zinc-800 rounded-md", color)}
        onClick={() => onClick(id)}>
        <div className={"self-start"}>
            <Icon/>
        </div>
        <div className={"mt-auto text-left"}>
            <p className={classNames("text-xl font-normal", {"font-bold": active})}>{name}</p>
            {/*<p className={"text-sm"}>test</p>*/}
        </div>
    </button>
}

export default TileCategory;
