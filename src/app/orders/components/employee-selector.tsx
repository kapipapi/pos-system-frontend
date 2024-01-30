import {Waiter} from "../../../models/waiter";
import {ReactElement} from "react";

type ItemProps = {
    selected: boolean,
    symbol: string,
    children: ReactElement | string
}

function Item(p: ItemProps) {
    return <li
        className={`flex flex-row ${p.selected ? "bg-zinc-800 text-white" : "text-zinc-800"} border border-zinc-800 p-1 text-base rounded-full pr-3 max-w-max items-center`}>
        <div
            className={`flex ${p.selected ? "bg-white text-zinc-800" : "bg-zinc-800 text-white"} h-8 text-xs mr-2 items-center justify-center aspect-square rounded-full`}>
            {p.symbol}
        </div>
        <p>{p.children}</p>
    </li>;
}

type Props = {
    users: Waiter[],
    selectedUser?: Waiter,
    onSelectUser: (user: Waiter | undefined) => void,
}

export default function EmployeeSelector({users, selectedUser, onSelectUser}: Props) {

    return <ul className={"flex flex-row space-x-3"}>
        <button key="all" onClick={() => onSelectUser(undefined)}>
            <Item symbol={"A"} selected={selectedUser === undefined}>
                <span>ALL</span>
            </Item>
        </button>
        {
            users?.map((user, index) => {
                return <button key={index} onClick={() => onSelectUser(user)}>
                    <Item symbol={user.name[0]} key={index}
                          selected={selectedUser?.id === user.id}>{user.name}</Item>
                </button>;
            })
        }
    </ul>
}