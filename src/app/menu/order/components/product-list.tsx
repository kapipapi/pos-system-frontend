import {Dispatch, SetStateAction, useContext, useState} from "react";
import {OrderContext} from "../../../../contexts/order-context";
import {isNil} from "lodash";
import {AiOutlineCloseCircle} from "react-icons/ai";
import classNames from "classnames";
import {ProductInOrder} from "../../../../models/product";
import {BsReceiptCutoff} from "react-icons/bs";

const Item = ({product, openAction, onClick}: {
    product: ProductInOrder,
    openAction: boolean,
    onClick: Dispatch<SetStateAction<string | undefined>>
}) => {
    const {removeProductFromOrder} = useContext(OrderContext);

    return <div className={"relative flex flex-row w-full h-10 group"}
                onMouseLeave={() => onClick(undefined)}>
        <div
            onClick={() => onClick(product.id)}
            className={classNames("z-10 flex flex-row w-full px-2 rounded-md cursor-pointer bg-zinc-800 text-white items-center justify-center", openAction ? "mr-11" : "")}>
            <p>{product.quantity} x {product.name}</p>
            <p className={"ml-auto"}>{product.price.toFixed(2)} zł</p>
        </div>
        <button key={product.id}
                onClick={() => removeProductFromOrder(product.id)}
                className={"z-0 absolute right-0 flex h-full aspect-square rounded-md bg-red-800 text-white items-center justify-center ml-2"}>
            <AiOutlineCloseCircle className={"text-xl"}/>
        </button>
    </div>
}

const ProductList = () => {
    const {table, order, createOrder} = useContext(OrderContext);
    const [activeItem, setActiveItem] = useState<string>();

    if (isNil(table)) {
        return null;
    }

    if (isNil(order)) {
        return <div
            className={"flex flex-col mb-2 w-full h-full justify-center items-center border rounded-md cursor-pointer"}
            onClick={() => createOrder()}>
            <BsReceiptCutoff className={"text-4xl mb-1 mx-auto text-black"}/>
            <p className={"text-xl"}>CREATE ORDER</p>
        </div>
    }

    if (order.products?.length < 1) {
        return <div
            className={"flex flex-col mb-2 w-full h-full justify-center items-center"}>
            <BsReceiptCutoff className={"text-4xl mb-1 mx-auto text-black"}/>
            <p className={"text-xl"}>EMPTY ORDER</p>
        </div>
    }

    return <div className={"flex flex-col w-full space-y-2 overflow-y-scroll no-scrollbar"}>
        {order.products?.map((product) => {
            return <Item key={product.id} product={product} openAction={activeItem === product.id} onClick={setActiveItem}/>
        })}
    </div>
}

export default ProductList;