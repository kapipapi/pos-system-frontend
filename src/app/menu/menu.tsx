import TileCategory from "./components/tile-category";
import {useContext, useEffect, useState} from "react";
import {Category} from "../../models/category";
import {Product} from "../../models/product";
import TileProduct from "./components/tile-product";
import Order from "./order/order";
import {OrderContext} from "../../contexts/order-context";
import {isNil} from "lodash";
import {authFetchGet} from "../../hooks/authFetchGet";
import {useAuth} from "react-oidc-context";

function Menu() {
    const auth = useAuth();

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, selectCategory] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    const {addProductToOrder} = useContext(OrderContext)

    useEffect(() => {
        authFetchGet<[Category]>("get_categories", auth.user?.access_token)
            .then((res) => {
                setCategories(res)
                selectCategory(res[0].category)
            })
            .catch(e => console.error(e));
    }, [auth, setCategories])

    useEffect(() => {
        if (!isNil(selectedCategory)) {
            authFetchGet("get_products_by_category", auth.user?.access_token)
                .catch(e => console.log(e))
                .then((res) => setProducts(res as Product[]));
        }
    }, [auth, setProducts, selectedCategory])

    return (
        <div className={"flex flex-row w-full max-h-screen"}>
            <div className={"flex flex-col w-full"}>
                <div className={"flex w-full"}>
                    <input placeholder={"Search item..."}
                           className={"border-2 border-zinc-800 rounded-md h-12 px-3 mt-2 w-full outline-none"}/>
                </div>
                <div className={"flex flex-col w-full overflow-hidden"}>
                    <div
                        className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full p-2 px-0 gap-2"}>
                        {categories.map((category) => {
                            return <TileCategory key={category.category_id}
                                                 category={category.category}
                                                 num_items={category.item_count}
                                                 active={selectedCategory === category.category}
                                                 onClick={selectCategory}
                            />
                        })}
                    </div>

                    <div className={"border-b-2 my-0.5 border-zinc-800"}></div>

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