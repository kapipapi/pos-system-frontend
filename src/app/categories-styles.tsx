import {FaCoffee} from "react-icons/fa";
import {FaGlassWater, FaPizzaSlice} from "react-icons/fa6";

export const CategoryIcon = ({name}: { name: string }) => {
    switch (name?.toUpperCase()) {
        case "KAWA":
            return <FaCoffee className={"text-4xl"}/>;
        case "NAPOJE":
            return <FaGlassWater className={"text-3xl"}/>;
        case "PIZZA":
            return <FaPizzaSlice className={"text-3xl"}/>;
        default:
            return <p>"ICON"</p>;
    }
}

const bgColorsDict: { [name: string]: string } = {
    "NAPOJE": "bg-pale",
    "PIZZA": "bg-tinky",
    "KAWA": "bg-blu",

    "unused1": "bg-fleet",
    "unused2": "bg-pinky",
    "unused3": "bg-sugar-pink",
    "unused4": "bg-sick",
}

export const categoryBgColor = (name: string) => {
    return bgColorsDict[name.toUpperCase()] ?? bgColorsDict["unused1"];
}

const borderColorsDict: { [name: string]: string } = {
    "NAPOJE": "border-pale",
    "PIZZA": "border-tinky",
    "KAWA": "border-blu",

    "unused1": "border-fleet",
    "unused2": "border-pinky",
    "unused3": "border-sugar-pink",
    "unused4": "border-sick",
}

export const categoryBorderColor = (name: string) => {
    return borderColorsDict[name.toUpperCase()] ?? borderColorsDict["unused1"];
}