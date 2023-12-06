import {useContext, useState} from "react";
import TileProduct from "./components/tile-product";
import Order from "./order/order";
import {OrderContext} from "../../contexts/order-context";
import {useAuth} from "react-oidc-context";
import {ProductInOrder} from "../../models/product";

function Menu() {
    const auth = useAuth();

    const [products, setProducts] = useState<ProductInOrder[]>([]);

    const {addProductToOrder} = useContext(OrderContext)

    return (
        <div className={"flex flex-row w-full max-h-screen"}>
            <div className={"flex flex-col w-full"}>
                <div className={"flex w-full"}>
                    <input placeholder={"Search item..."}
                           className={"border-2 border-zinc-800 rounded-md h-12 px-3 mt-2 w-full outline-none"}/>
                </div>
                <div className={"flex flex-col w-full overflow-hidden"}>
                    <div
                        className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full mt-2 gap-2 overflow-y-scroll no-scrollbar snap-y"}>
                        {products.map((product) => {
                            return <TileProduct key={product.id}
                                                id={product.id}
                                                name={product.name}
                                                price={product.price}
                                                onClick={(id) => {
                                                    addProductToOrder(id)
                                                }}
                            />
                        })}
                    </div>
                </div>
            </div>
            <Order/>
        </div>
    )
}

export default Menu;