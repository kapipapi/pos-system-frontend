import {FC} from "react";
import ReactModal from "react-modal";
import {Controller, useForm} from "react-hook-form";
import classNames from "classnames";
import {IoClose} from "react-icons/io5";
import Select from 'react-select'
import {Category, NewCategory} from "../../../../models/category";
import * as FaIcons from "react-icons/fa";
import {DynamicIcon} from "./dynamic-icon";
import {CirclePicker} from 'react-color';
import {isNil} from "lodash";
import {colors} from "../../colors";

export type ModalState = "add" | Category | undefined;

type Props = {
    isOpen: boolean;
    modalState: ModalState;
    closeModal: () => void;
    onSubmit: (cat: Category | NewCategory) => void;
};
const CategoryForm: FC<Props> = ({isOpen, modalState, closeModal, onSubmit}) => {
    let values = {
        id: "",
        name: "",
        icon: "",
        color: "",
    };

    if (modalState !== "add" && !isNil(modalState) && !isNil(modalState?.id) && !isNil(modalState?.name) && !isNil(modalState?.icon) && !isNil(modalState?.color)) {
        values = {
            id: modalState.id,
            name: modalState.name,
            icon: modalState.icon,
            color: modalState.color,
        }
    }

    const {control, register, handleSubmit, reset, formState: {errors}} = useForm<Category | NewCategory>({
        values: values,
    });

    const styles = {
        label: "text-sm font-light",
        input: "w-full p-2 text-lg border bg-white rounded-md",
    }

    const iconOptions = Object.keys(FaIcons).map((key) => {
        return {value: key, label: key}
    })

    return (
        <ReactModal
            isOpen={isOpen}
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
                <h1 className={"font-bold text-2xl text-center"}>Create new category</h1>
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
                               className={classNames(styles.input)}
                        />
                        <p className={"text-sm text-red-600"}>{errors.name?.message}</p>
                    </div>

                    <div>
                        <label className={classNames(styles.label)}>Icon</label>
                        <br/>
                        <Controller
                            control={control}
                            defaultValue={"FaBeer"}
                            name="icon"
                            render={({field}) => (
                                <div className={"relative"}>
                                    <Select
                                        ref={field.ref}
                                        value={iconOptions.find(c => c.value === field.value)}
                                        onChange={val => field.onChange(val?.value ?? "FaBeer")}
                                        options={iconOptions}
                                        classNames={{
                                            control: () => "p-1",
                                            menuList: () => "overflow-x-hidden",
                                        }}
                                    />
                                    <DynamicIcon name={field.value}
                                                 className={"text-2xl text-black absolute top-1/4 -right-8"}/>
                                </div>)}
                        />
                        <p className={"text-sm text-red-600"}>{errors.name?.message}</p>
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
                            {
                                modalState === "add" ? "Create" : "Update"
                            }
                        </button>
                    </div>
                </form>

            </div>
        </ReactModal>
    )
}

export default CategoryForm;