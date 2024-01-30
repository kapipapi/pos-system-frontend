import {useEffect, useState} from "react";
import {authFetchDelete, authFetchGet, authFetchPost} from "../../../../hooks/authFetch";
import {useAuth} from "oidc-react";
import {FaTrashCan} from "react-icons/fa6";
import {FaPlus} from "react-icons/fa";
import {NewWaiter, Waiter} from "../../../../models/waiter";
import NewUserForm from "./new-user-form";

const UsersSettings = () => {
    const auth = useAuth();
    let token = auth.userData?.access_token;

    const [modalState, setModalState] = useState(false);

    const [users, setUsers] = useState<Waiter[]>([]);
    const fetchUsers = () => {
        authFetchGet<Waiter[]>("waiters", token)
            .then((res) => {
                setUsers(res)
            })
            .catch(e => console.error(e));
    }
    useEffect(fetchUsers, [setUsers, token])


    const onNewUserFormSubmit = (newWaiter: NewWaiter) => {
        authFetchPost<Waiter[]>("waiters", token, newWaiter)
            .then((res) => {
                setUsers(res)
            })
            .catch(err => console.error(err))
    }

    const removeRow = (id: string) => {
        authFetchDelete(`admin/users/${id}`, token)
            .then((res) => {
                console.log(res)
                fetchUsers()
            })
            .catch(err => console.error(err))
    }

    return (
        <div className={"flex flex-col w-full p-2"}>
            <div className={"flex flex-row mb-2 items-center"}>
                <NewUserForm modalState={modalState} closeModal={() => setModalState(false)}
                                 onSubmit={onNewUserFormSubmit}/>
                <div className={"space-x-2"}>
                    <button onClick={() => setModalState(true)}
                            className={"inline-flex items-center border rounded-md p-1"}>
                        Add
                        <FaPlus className={"ml-2"}/></button>
                </div>
            </div>
            <table>
                <thead>
                <tr className={"text-center [&>*]:border"}>
                    <th>Name</th>
                    <th>Color</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => {
                    return (
                        <tr className={"text-center [&>*]:border h-10"} key={user._id}>
                            <td>{user.name}</td>
                            {/*<td style={{backgroundColor: user.color}}>{" "}</td>*/}
                            <td>
                                <button
                                    onClick={() => removeRow(user._id)}
                                    className={"aspect-square border rounded-lg p-1"}
                                >
                                    <FaTrashCan/>
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default UsersSettings;