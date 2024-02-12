import {Dispatch, FC, SetStateAction, useState} from "react";
import {AiOutlineCloseCircle} from "react-icons/ai";
import classNames from "classnames";
import {ProductInOrder} from "../../../models/product";

const Item = ({product, openAction, onClick, removeProduct}: {
    product: ProductInOrder,
    openAction: boolean,
    onClick: Dispatch<SetStateAction<string | undefined>>
    removeProduct: (productId: string) => void
}) => {
    return <div className={"relative flex flex-row w-full h-12 group"}
                onMouseLeave={() => onClick(undefined)}>
        <div
            onClick={() => onClick(product._id)}
            style={{borderColor: product.category.color}}
            className={classNames(
                "z-10 flex flex-row w-full px-2 rounded-md cursor-pointer bg-zinc-800 text-bone items-center justify-center border-l-8",
                openAction ? "mr-14" : ""
            )}>
            <p className={"flex space-x-2 items-center"}>
                <span className={"font-bold"}>{product.name}</span>
                <span className={"text-zinc-400"}>x {product.quantity}</span>
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

type Props = {
    products: ProductInOrder[],
    removeProduct: (productId: string) => void
}

const ProductList: FC<Props> = ({products, removeProduct}) => {
    const [activeItem, setActiveItem] = useState<string>();

    return <div className={"flex flex-col w-full space-y-2 overflow-y-scroll no-scrollbar"}>
        {products.map((product) => {
            return <Item key={product._id}
                         product={product}
                         openAction={activeItem === product._id}
                         onClick={setActiveItem}
                         removeProduct={removeProduct}/>
        })}
    </div>
}

export default ProductList;