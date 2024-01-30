import {useEffect, useState} from "react";
import {FaPlus} from "react-icons/fa";
import {useAuth} from "oidc-react";
import {authFetchGet, authFetchPost} from "../../../../hooks/authFetch";
import GenericForm from "./generic-form";

type GenericSettingsProps<T, K> = {
    fetchEndpoint: string;
    default_values: K;
};

const GenericSettings = <T extends object, K extends object>({
                                                                 fetchEndpoint,
                                                                 default_values
                                                             }: GenericSettingsProps<T, K>) => {
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

    const headers = Object.keys(items[0] ?? {}).map((key) => (
        <th key={String(key)} className={"border"}>{String(key)}</th>
    ));

    const rows = items.map((item, index) => (
        <tr key={index}>
            {
                Object.keys(item).map((key) => (
                    <td key={key} className={"border"}>
                        {String(item[key as keyof T])}
                    </td>
                ))
            }
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