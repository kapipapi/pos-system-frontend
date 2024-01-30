import {FC} from "react";
import ReactModal from "react-modal";
import {Controller, useForm} from "react-hook-form";
import classNames from "classnames";
import {IoClose} from "react-icons/io5";
import {NewUser} from "../../../../models/waiter";
import {CirclePicker} from "react-color";
import {colors} from "../../colors";

type Props = {
    modalState: boolean;
    closeModal: () => void;
    onSubmit: (newUser: NewUser) => void;
};
const NewUserForm: FC<Props> = ({modalState, closeModal, onSubmit}) => {
    const {register, control, handleSubmit, reset, formState: {errors}} = useForm<NewUser>();

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
                        <label className={classNames(styles.label)}>PIN</label>
                        <br/>
                        <input pattern="^[0-9][0-9][0-9][0-9]$"
                               maxLength={4} {...register("code", {required: "PIN is required (numbers only)"})}
                               className={classNames(styles.input)}/>
                        <p className={"text-sm text-red-600"}>{errors.code?.message}</p>
                    </div>

                    <div>
                        <label className={classNames(styles.label)}>Color</label>
                        <br/>
                        <Controller
                            control={control}
                            defaultValue={"blu"}
                            name="color"
                            render={({field}) => (
                                <div className={"relative"}>
                                    <CirclePicker
                                        ref={field.ref}
                                        color={field.value}
                                        colors={colors}
                                        onChangeComplete={val => field.onChange(val.hex)}
                                    />
                                </div>)}
                        />
                        <p className={"text-sm text-red-600"}>{errors.name?.message}</p>
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