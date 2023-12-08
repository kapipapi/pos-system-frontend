import {FC} from "react";
import ReactModal from "react-modal";
import {NewProduct} from "../../../models/product";
import {useForm} from "react-hook-form";

type Props = {
    modalState: boolean;
    closeModal: () => void;
    onSubmit: (newProduct: NewProduct) => void;
};
const NewProductForm: FC<Props> = ({modalState, closeModal, onSubmit}) => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<NewProduct>();

    return (
        <ReactModal
            isOpen={modalState}
            contentLabel="Minimal Modal Example"
        >
            <div>
                <form
                    onSubmit={handleSubmit((data) => {
                        onSubmit(data);
                        closeModal();
                    })}
                    className={"flex flex-col space-y-2"}
                >
                    <label>Name</label>
                    <input {...register("name")} className={"border"}/>

                    <label>Price</label>
                    <input type={"number"} {...register("price", {
                        valueAsNumber: true,
                        validate: (value) => value > 0,
                    })} className={"border"}/>

                    <label>Tax</label>
                    <input type={"number"} {...register("tax", {
                        valueAsNumber: true,
                        validate: (value) => value > 0,
                    })} className={"border"}/>

                    <label>Category</label>
                    <input {...register("category")} className={"border"}/>

                    <label>Description</label>
                    <input {...register("description")} className={"border"}/>

                    <button type="submit" className={"inline-flex items-center border rounded-md p-1"}>
                        Create New Order
                    </button>
                </form>
                <button onClick={() => closeModal()} className={"inline-flex items-center border rounded-md p-1"}>
                    Close Modal
                </button>
            </div>
        </ReactModal>
    );
}

export default NewProductForm;