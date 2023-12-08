import {FC, useEffect} from "react";
import ReactModal from "react-modal";
import {NewProduct} from "../../../models/product";
import {useForm} from "react-hook-form";

type Props = {
    modalState: boolean;
    closeModal: () => void;
    onSubmit: (newProduct: NewProduct) => void;
};
const NewProductForm: FC<Props> = ({modalState, closeModal, onSubmit}) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm<NewProduct>();

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
            <div className={"mx-auto w-1/2"}>
                <h1 className={"font-bold text-2xl text-center"}>Create new product</h1>
                <form
                    onSubmit={handleSubmit((data) => {
                        onSubmit(data);
                        closeModal();
                        reset();
                    })}
                    className={"flex flex-col space-y-2"}
                >
                    <div>
                        <label>Name</label>
                        <br/>
                        <input {...register("name", {required: "Name is required"})} className={"border"}/>
                        <p className={"text-sm text-red-600"}>{errors.name?.message}</p>
                    </div>

                    <div>
                        <label>Price</label>
                        <br/>
                        <input type={"number"} {...register("price", {
                            required: "Price is required",
                            valueAsNumber: true,
                            validate: {
                                positive: v => v > 0 || 'Price must be positive',
                            },
                        })} className={"border"}/>
                        <p className={"text-sm text-red-600"}>{errors.price?.message}</p>
                    </div>

                    <div>
                        <label>Tax</label>
                        <br/>
                        <input type={"number"} {...register("tax", {
                            required: "Tax is required",
                            valueAsNumber: true,
                            validate: {
                                positive: v => v > 0 || 'Tax must be positive',
                            },
                        })} className={"border"}/>
                        <p className={"text-sm text-red-600"}>{errors.tax?.message}</p>
                    </div>

                    <div>
                        <label>Category</label>
                        <br/>
                        <input {...register("category", {required: "Category is required"})} className={"border"}/>
                        <p className={"text-sm text-red-600"}>{errors.category?.message}</p>
                    </div>

                    <div>
                        <label>Description</label>
                        <br/>
                        <input {...register("description", {required: "Description is required"})}
                               className={"border"}/>
                        <p className={"text-sm text-red-600"}>{errors.description?.message}</p>
                    </div>

                    <div className={"w-full space-x-4"}>
                        <button onClick={() => {
                            closeModal();
                            reset();
                        }} className={"inline-flex items-center border rounded-md p-1"}>
                            Close Modal
                        </button>
                        <button type="submit" className={"inline-flex items-center border rounded-md p-1"}>
                            Create New Order
                        </button>
                    </div>
                </form>

            </div>
        </ReactModal>
    );
}

export default NewProductForm;