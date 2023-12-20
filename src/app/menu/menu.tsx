import {useContext, useEffect, useState} from "react";
import TileProduct from "./components/tile-product";
import Order from "./order/order";
import {OrderContext} from "../../contexts/order-context";
import {useAuth} from "react-oidc-context";
import {Product} from "../../models/product";
import {authFetchGet} from "../../hooks/authFetch";
import {IoSearch} from "react-icons/io5";

function Menu() {
    const auth = useAuth();
    let token = auth.user?.access_token;

    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = () => {
        authFetchGet<Product[]>("menu_view/get_all_products", token)
            .then((res) => {
                setProducts(res)
            })
            .catch(e => console.error(e));
    }
    useEffect(fetchProducts, [setProducts, token])

    const {addProductToOrder} = useContext(OrderContext)

    return (
        <div className={"flex flex-row w-full max-h-screen"}>
            <div className={"flex flex-col w-full"}>
                <div className={"flex w-full items-center border mt-2 rounded-md"}>
                    <IoSearch className={"text-2xl ml-3"}/>
                    <input placeholder={"Search item..."}
                           className={"h-12 px-3 mr-1 w-full outline-none"}/>
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