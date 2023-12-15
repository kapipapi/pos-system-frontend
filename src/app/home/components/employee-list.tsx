import {useContext} from "react";
import {UserContext} from "../../../contexts/user-context";

type ItemProps = {
    small: boolean,
    selected: boolean,
    symbol: string,
    children: string
}

function Item(p: ItemProps) {
    return <li
        className={`flex flex-row ${p.selected ? "bg-zinc-800 text-white" : "text-zinc-800"} border border-zinc-800 ${p.small ? "p-1 text-base rounded-full pr-3 max-w-max " : "p-4 text-2xl rounded-md"} items-center`}>
        <div
            className={`flex ${p.selected ? "bg-white text-zinc-800" : "bg-zinc-800 text-white"} ${p.small ? "h-8 text-xs mr-2" : "h-12 text-base mr-3"} items-center justify-center aspect-square rounded-full`}>
            {p.symbol}
        </div>
        <p>{p.children}</p>
    </li>;
}

type ListProps = {
    small?: boolean
}

export default function EmployeeList(p: ListProps) {
    const {isLoadingUsers: isLoading, usersList: users, selectedUser, selectUser} = useContext(UserContext);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return <ul className={`${p.small ? "space-y-2" : "w-full space-y-5"}`}>
        {
            users?.map((value, index) => {
                return <button className={"w-full"} key={index} onClick={() => selectUser(value.id)}>
                    <Item small={p.small ?? false} symbol={value.name[0]} key={index}
                          selected={selectedUser === value.id}>{value.name}</Item>
                </button>;
            })
        }
    </ul>
}