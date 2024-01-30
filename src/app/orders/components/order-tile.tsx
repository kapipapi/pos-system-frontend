import {Order} from "../../../models/order";
import {FC} from "react";
import {ProductInOrder} from "../../../models/product";
import {FaRegPenToSquare} from "react-icons/fa6";

const ProductRow = ({product}: { product: ProductInOrder }) => {
    return <tr className={"h-7"}>
        <td>{product.name}</td>
        <td>x {product.quantity}</td>
        <td className={"text-right"}>{product.price.toFixed(2)} zł</td>
    </tr>
}

type Props = {
    order: Order,
    selectOrder: (orderId: string) => void
}

export const OrderTile: FC<Props> = ({order, selectOrder}) => {

    return <div className={"bg-nice-gray text-bone px-3 py-4 pt-2 rounded-md"}>
        <div className={"flex flex-row text-xl font-light"}>
            <p className={""}>{order.waiter.name}</p>
            <p className={"ml-auto"}>{order.table.name}</p>
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
            {order.products?.map((product) => <ProductRow key={product._id} product={product}/>)}
            </tbody>
        </table>

        <hr className={"stroke-bone mx-1 mt-4 mb-1"}/>

        <div className={"flex items-center mb-3"}>
            <span className={"text-sm font-light"}>Total</span>
            <span className={"text-xl ml-auto"}>{order.sum.toFixed(2)} zł</span>
        </div>

        <div className={"flex flex-row h-14 space-x-2 text-zinc-300"}>
            <button
                className={"flex flex-col w-12 h-12 aspect-square border border-zinc-500 rounded-xl items-center justify-center"}
                onClick={() => selectOrder(order._id)}
            >
                <FaRegPenToSquare className={"w-full text-xl"}/>
            </button>
            <button className={"flex flex-col w-full h-12 rounded-xl bg-zinc-500 items-center justify-center"}>
                <p className={"text-bone"}>Payment</p>
            </button>
        </div>
        <p className={"text-xs font-extralight text-center"}>{order._id}</p>
    </div>
}