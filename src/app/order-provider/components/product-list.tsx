import {Dispatch, SetStateAction, useContext, useState} from "react";
import {AiOutlineCloseCircle} from "react-icons/ai";
import classNames from "classnames";
import {Product} from "../../../models/product";
import {OrderContext} from "../order-provider";
import {isNil} from "lodash";

const Item = ({product, openAction, onClick, removeProduct}: {
    product: Product,
    openAction: boolean,
    onClick: Dispatch<SetStateAction<string | undefined>>
    removeProduct: (productId: string) => void
}) => {
    return <div className={"relative flex flex-row w-full h-12 group"}
                onMouseLeave={() => onClick(undefined)}>
        <div
            onClick={() => onClick(product._id)}
            className={classNames(
                "z-10 flex flex-row w-full px-2 rounded-md cursor-pointer bg-zinc-800 text-bone items-center justify-center border-l-8",
                openAction ? "mr-14" : ""
            )}>
            <p className={"flex space-x-2 items-center"}>
                <span className={"font-bold"}>{product.name}</span>
                <span className={"text-zinc-400"}>x </span>
            </p>
            <p className={"ml-auto"}>{product.price.toFixed(2)} zł</p>
        </div>
        <button key={product._id}
                onClick={() => removeProduct(product._id)}
                className={"z-0 absolute right-0 flex h-full aspect-square rounded-md bg-red-800 text-white items-center justify-center ml-2"}>
            <AiOutlineCloseCircle className={"text-xl"}/>
        </button>
    </div>
}

const ProductList = () => {
    const {order} = useContext(OrderContext);

    const [activeItem, setActiveItem] = useState<string>();

    if (isNil(order)) return <div>No order selected</div>;

    return <div className={"flex flex-col w-full space-y-2 overflow-y-scroll no-scrollbar"}>
        {order.products?.map((product) => {
            return <Item key={product._id}
                         product={product}
                         openAction={activeItem === product._id}
                         onClick={setActiveItem}
                         removeProduct={(productId) => console.log(order._id, productId, "token")}/>
        })}
    </div>
}

export default ProductList;