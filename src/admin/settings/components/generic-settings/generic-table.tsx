import {useEffect, useState} from "react";
import {FaPlus} from "react-icons/fa";
import {useAuth} from "oidc-react";
import {authFetchDelete, authFetchGet, authFetchPost} from "../../../../hooks/authFetch";
import GenericForm from "./generic-form";

type GenericSettingsProps<K> = {
    fetchEndpoint: string;
    default_values: K;
};

interface Item {
    _id: string;
}

const GenericSettings = <T extends Item, K extends object>({
                                                                 fetchEndpoint,
                                                                 default_values
                                                             }: GenericSettingsProps<K>) => {
    const auth = useAuth();
    let token = auth.userData?.access_token;

    const [items, setItems] = useState<T[]>([]);

    const fetchItems = () => {
        authFetchGet<T[]>(fetchEndpoint, token)
            .then((res) => {
                setItems(res);
            })
            .catch(e => setItems([] as T[]));
    };

    const createItem = (newItem: K) => {
        authFetchPost(fetchEndpoint, token, newItem)
            .then(() => {
                fetchItems();
            })
            .catch(e => console.log(e));
    };

    useEffect(fetchItems, [fetchEndpoint, setItems, token]);

    const deleteItem = (item_id: string) => {
        authFetchDelete(fetchEndpoint + "/" + item_id, token)
            .then(() => {
                fetchItems();
            })
            .catch(e => console.log(e));
    };

    const headers = Object.keys(items[0] ?? {}).map((key) => (
        <th key={String(key)} className={"border"}>{String(key)}</th>
    )).concat([<th key={"actions"} className={"border"}>Actions</th>])

    const rows = items.map((item, index) => (
        <tr key={index}>
            {
                Object.keys(item).map((key) => (
                    <td key={key} className={"border"}>
                        {String(item[key as keyof T])}
                    </td>
                ))
            }
            <td className={"w-32"}>
                <div className={"flex w-full justify-around"}>
                    <button className={"inline-flex items-center border rounded-md p-1 hover:bg-blue-300"} onClick={()=>deleteItem(item._id)}>
                        Edit
                    </button>
                    <button className={"inline-flex items-center border rounded-md p-1 hover:bg-red-300"} onClick={()=>deleteItem(item._id)}>
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    ))

    return (
        <div className={"flex flex-col w-full p-2"}>
            <GenericForm<K> onSubmit={createItem} default_values={default_values}/>
            <div className={"flex flex-row mb-2 items-center"}>
                <div className={"space-x-2"}>
                    <button className={"inline-flex items-center border rounded-md p-1"}>
                        Add
                        <FaPlus className={"ml-2"}/>
                    </button>
                </div>
            </div>
            <table className={"border"}>
                <thead>
                <tr>
                    {headers}
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        </div>
    );
};

export default GenericSettings;