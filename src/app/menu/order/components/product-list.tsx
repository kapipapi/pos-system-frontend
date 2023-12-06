import {Product} from "../../../../models/product";
import {Dispatch, SetStateAction, useContext, useState} from "react";
import {OrderContext} from "../../../../contexts/order-context";
import {isNil} from "lodash";
import {AiOutlineClose} from "react-icons/ai";
import classNames from "classnames";

const Item = ({product, openAction, onClick}: {
    product: Product,
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
            <AiOutlineClose className={"text-xl"}/>
        </button>
    </div>
}

const ProductList = () => {
    const {table, order} = useContext(OrderContext);
    const [activeItem, setActiveItem] = useState<string>();

    if (isNil(table) || isNil(order)) {
        return null;
    }

    return <div className={"flex flex-col w-full space-y-2 overflow-y-scroll no-scrollbar"}>
        {order.products.map((product) => {
            return <Item product={product} openAction={activeItem === product.id} onClick={setActiveItem}/>
        })}
    </div>
}

export default ProductList;