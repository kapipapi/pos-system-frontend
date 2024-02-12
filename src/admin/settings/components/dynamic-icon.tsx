import {isNil} from "lodash";
import * as FaIcons from "react-icons/pi";

export const DynamicIcon = ({name, className}: { name?: string, className?: string }) => {
    if (isNil(name)) return (<>unknown</>);

    const Icon = FaIcons[name as keyof typeof FaIcons];
    if (isNil(Icon)) return (<>no icon</>);

    return <Icon className={className}/>
}