import {FC, useEffect, useState} from "react";
import ReactModal from "react-modal";
import {useForm} from "react-hook-form";
import classNames from "classnames";
import {IoClose} from "react-icons/io5";
import {useAuth} from "oidc-react";
import {authFetchGet} from "../../../../hooks/authFetch";
import {NewUser, User} from "../../../../models/user";

type Props = {
    modalState: boolean;
    closeModal: () => void;
    onSubmit: (newUser: NewUser) => void;
};
const NewUserForm: FC<Props> = ({modalState, closeModal, onSubmit}) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<NewUser>();

    const auth = useAuth();
    let token = auth.userData?.access_token;

    const [users, setUsers] = useState<User[]>([]);
    const fetchUsers = () => {
        authFetchGet<User[]>("settings_view/users", token)
            .then((res) => {
                setUsers(res)
            })
            .catch(e => console.error(e));
    }
    useEffect(fetchUsers, [setUsers, token])

    const styles = {
        label: "text-sm font-light",
        input: "w-full p-2 text-lg border bg-bone rounded-md",
    }

    return (
        <ReactModal
            isOpen={modalState}
            ariaHideApp={false}
            contentLabel="Minimal Modal Example"
            onRequestClose={() => {
                closeModal();
                reset();
            }}
            style={{
                content: {
                    margin: 'auto auto',
                    width: '50%',
                }
            }}
        >
            <div className={"mx-auto w-2/3"}>
                <h1 className={"font-bold text-2xl text-center"}>Create new user</h1>
                <form
                    onSubmit={handleSubmit((data) => {
                        onSubmit(data);
                        closeModal();
                        reset();
                    })}
                    className={"grid grid-cols-2 gap-4 mt-4"}
                >
                    <div>
                        <label className={classNames(styles.label)}>Name</label>
                        <br/>
                        <input {...register("name", {required: "Name is required"})}
                               className={classNames(styles.input)}/>
                        <p className={"text-sm text-red-600"}>{errors.name?.message}</p>
                    </div>

                    <div>
                        <label className={classNames(styles.label)}>Color</label>
                        <br/>
                        <input pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$" {...register("color", {required: "Color is required"})}
                               className={classNames(styles.input)}/>
                        <p className={"text-sm text-red-600"}>{errors.color?.message}</p>
                    </div>

                    <div>
                        <label className={classNames(styles.label)}>PIN</label>
                        <br/>
                        <input pattern="^[0-9][0-9][0-9][0-9]$" maxLength={4} {...register("pin", {required: "PIN is required (numbers only)"})}
                               className={classNames(styles.input)}/>
                        <p className={"text-sm text-red-600"}>{errors.pin?.message}</p>
                    </div>

                    <div className={"flex justify-between w-full col-span-2 mt-5"}>
                        <button onClick={() => {
                            closeModal();
                            reset();
                        }} className={"inline-flex items-center rounded-md p-2 pr-3 text-white bg-red-900"}>
                            <IoClose className={"text-xl"}/>
                            Close Modal
                        </button>
                        <button type="submit"
                                className={"inline-flex items-center rounded-md p-2 text-white bg-emerald-900"}>
                            Create New User
                        </button>
                    </div>
                </form>

            </div>
        </ReactModal>
    )
        ;
}

export default NewUserForm;