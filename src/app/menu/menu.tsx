import {useContext, useEffect, useState} from "react";
import TileProduct from "./components/tile-product";
import {useAuth} from "oidc-react";
import {Product} from "../../models/product";
import {authFetchGet} from "../../hooks/authFetch";
import {IoSearch} from "react-icons/io5";
import {Category} from "../../models/category";
import TileCategory from "./components/tile-category";
import {OrderContext} from "../order-provider/order-provider";

function Menu() {
    const auth = useAuth();
    let token = auth.userData?.access_token;

    const [products, setProducts] = useState<Product[]>([]);

    const {addProductToOrder} = useContext(OrderContext);

    const fetchProducts = () => {
        authFetchGet<Product[]>("products", token)
            .then((res) => {
                setProducts(res)
            })
            .catch(e => console.error(e));
    }
    useEffect(fetchProducts, [setProducts, token])

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>();

    return (
        <div className={"flex flex-row w-full max-h-screen"}>
            <div className={"flex flex-col w-full"}>
                <label className={"flex w-full items-center mt-2 rounded-md"}>
                    <IoSearch className={"text-2xl ml-3"}/>
                    <input placeholder={"Search item..."}
                           className={"h-14 px-3 mr-1 w-full outline-none"}/>
                </label>
                <div className={"flex flex-col w-full overflow-hidden"}>
                    <div
                        className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full mt-2 gap-2 overflow-y-scroll no-scrollbar snap-y"}>
                        {
                            categories.map((category) => <TileCategory
                                    key={category._id}
                                    category={category}
                                    active={category._id === selectedCategory}
                                    onClick={category._id === selectedCategory ? () => setSelectedCategory(undefined) : setSelectedCategory}
                                />
                            )}
                    </div>
                    <div
                        className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2 w-full gap-2 overflow-y-scroll no-scrollbar snap-y"}>
                        {products
                            // .filter(p => selectedCategory ? p.category.id === selectedCategory : true)
                            .map((product) => {
                                return <TileProduct key={product._id}
                                                    product={product}
                                                    onClick={(id) => addProductToOrder(id)}
                                />
                            })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu;