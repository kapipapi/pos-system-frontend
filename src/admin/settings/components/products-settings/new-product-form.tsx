import {FC, useEffect, useState} from "react";
import ReactModal from "react-modal";
import {NewProduct, Product} from "../../../../models/product";
import {useForm} from "react-hook-form";
import classNames from "classnames";
import {IoClose} from "react-icons/io5";
import {useAuth} from "oidc-react";
import {authFetchGet} from "../../../../hooks/authFetch";
import {Category} from "../../../../models/category";

type Props = {
    modalState: boolean;
    closeModal: () => void;
    onSubmit: (newProduct: NewProduct) => void;
};
const NewProductForm: FC<Props> = ({modalState, closeModal, onSubmit}) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<NewProduct>();

    const auth = useAuth();
    let token = auth.userData?.access_token;

    const [categories, setCategories] = useState<Category[]>([]);
    const fetchCategories = () => {
        authFetchGet<Category[]>("admin/categories", token)
            .then((res) => {
                setCategories(res)
            })
            .catch(e => console.error(e));
    }
    useEffect(fetchCategories, [setCategories, token])

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
                <h1 className={"font-bold text-2xl text-center"}>Create new product</h1>
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
                        <input {...register("name", {required: "Name is required"})} className={classNames(styles.input)}/>
                        <p className={"text-sm text-red-600"}>{errors.name?.message}</p>
                    </div>

                    <div>
                        <label className={classNames(styles.label)}>Price</label>
                        <br/>
                        <input type={"number"} {...register("price", {
                            required: "Price is required",
                            valueAsNumber: true,
                            validate: {
                                positive: v => v > 0 || 'Price must be positive',
                            },
                        })} className={classNames(styles.input)}/>
                        <p className={"text-sm text-red-600"}>{errors.price?.message}</p>
                    </div>

                    <div>
                        <label className={classNames(styles.label)}>Tax</label>
                        <br/>
                        <input type={"number"} {...register("tax", {
                            required: "Tax is required",
                            valueAsNumber: true,
                            validate: {
                                positive: v => v > 0 || 'Tax must be positive',
                            },
                        })} className={classNames(styles.input)}/>
                        <p className={"text-sm text-red-600"}>{errors.tax?.message}</p>
                    </div>

                    <div>
                        <label className={classNames(styles.label)}>Category</label>
                        <br/>
                        <select {...register("category", {required: "Category is required"})} className={classNames(styles.input)}>
                            {categories.map((category) => {
                                return <option key={category.id} value={category.id}>{category.name}</option>
                            })}
                        </select>
                        <p className={"text-sm text-red-600"}>{errors.category?.message}</p>
                    </div>

                    <div>
                        <label className={classNames(styles.label)}>Description</label>
                        <br/>
                        <input {...register("description", {required: "Description is required"})}
                               className={classNames(styles.input)}/>
                        <p className={"text-sm text-red-600"}>{errors.description?.message}</p>
                    </div>

                    <div className={"flex justify-between w-full col-span-2 mt-5"}>
                        <button onClick={() => {
                            closeModal();
                            reset();
                        }} className={"inline-flex items-center rounded-md p-2 pr-3 text-white bg-red-900"}>
                            <IoClose className={"text-xl"}/>
                            Close Modal
                        </button>
                        <button type="submit" className={"inline-flex items-center rounded-md p-2 text-white bg-emerald-900"}>
                            Create New Product
                        </button>
                    </div>
                </form>

            </div>
        </ReactModal>
    )
        ;
}

export default NewProductForm;