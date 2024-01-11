import {ProductInOrder, sumupOrder} from "../../../models/product";
import {Order} from "../../../models/order";
import {isNil} from "lodash";
import {IoTrashOutline} from "react-icons/io5";
import {FaRegPenToSquare} from "react-icons/fa6";
import {FC} from "react";

const ProductRow = ({product}: { product: ProductInOrder }) => {
    return <tr className={"h-7"}>
        <td>{product.name}</td>
        <td>x {product.quantity}</td>
        <td className={"text-right"}>{product.price.toFixed(2)} zł</td>
    </tr>
}

type Props = {
    order: Order,
    onRemove: (id: string) => void,
    selectOrder: (tableId: string) => void
}

export const OrderTile: FC<Props> = ({order, onRemove, selectOrder}) => {

    return <div className={"bg-nice-gray text-bone px-3 py-4 pt-2 rounded-md"}>
        <div className={"flex flex-row text-xl font-light"}>
            <p className={""}>Table {order.table.name}</p>
            <p className={"ml-auto"}>{order.creator.name}</p>
        </div>

        <hr className={"stroke-bone mx-1 mt-2 mb-1"}/>

        <table className={"w-full"}>
            <thead>
            <tr className={"h-8"}>
                <th className={"text-zinc-500 font-light text-xs text-left"}>Name</th>
                <th className={"text-zinc-500 font-light text-xs text-left"}>QT</th>
                <th className={"text-zinc-500 font-light text-xs text-right"}>Price</th>
            </tr>
            </thead>
            <tbody>
            {order.products?.map((product) => <ProductRow key={product.id} product={product}/>)}
            </tbody>
        </table>

        <hr className={"stroke-bone mx-1 mt-4 mb-1"}/>

        <div className={"flex items-center mb-3"}>
            <span className={"text-sm font-light"}>Total</span>
            <span className={"text-xl ml-auto"}>{sumupOrder(order.products).toFixed(2)} zł</span>
        </div>

        <div className={"flex flex-row h-14 space-x-2 text-zinc-300"}>
            <button
                className={"flex flex-col w-12 h-12 aspect-square border border-zinc-500 rounded-xl items-center justify-center"}
                onClick={() => onRemove(order.id)}>
                <IoTrashOutline className={"w-full text-2xl"}/>
            </button>
            <button
                className={"flex flex-col w-12 h-12 aspect-square border border-zinc-500 rounded-xl items-center justify-center"}
                onClick={() => selectOrder(order.table.id)}
            >
                <FaRegPenToSquare className={"w-full text-xl"}/>
            </button>
            <button className={"flex flex-col w-full h-12 rounded-xl bg-zinc-500 items-center justify-center"}>
                <p className={"text-bone"}>Payment</p>
            </button>
        </div>
        <p className={"text-xs font-extralight text-center"}>{order.id}</p>
    </div>
}