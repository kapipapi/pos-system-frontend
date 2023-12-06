import {FaGlassWater, FaPizzaSlice} from "react-icons/fa6";
import {FaCoffee} from "react-icons/fa";

type Prop = {
    product_id?: number,
    category: string,
    num_items?: number,
    active: boolean,
    onClick: (id: string) => void,
}

function TileCategory({category, num_items, active, onClick}: Prop) {

    const Icon = () => {
        switch (category?.toUpperCase()) {
            case "COFFEE":
                return <FaCoffee className={"text-4xl"}/>;
            case "DRINK":
                return <FaGlassWater className={"text-3xl"}/>;
            case "PIZZA":
                return <FaPizzaSlice className={"text-3xl"}/>;
            default:
                return <p>"ICON"</p>;
        }
    }

    return <button
        className={`flex flex-col h-full aspect-square p-4 border-2 border-zinc-800 ${active ? "bg-white text-zinc-800" : "bg-zinc-800 text-white"} rounded-md`}
        onClick={() => onClick(category)}>
        <div className={"self-start"}>
            <Icon/>
        </div>
        <div className={"mt-auto text-left"}>
            <p className={"text-md"}>{category.toUpperCase()}</p>
            <p className={"text-sm"}>{num_items} items</p>
        </div>
    </button>
}

export default TileCategory;
