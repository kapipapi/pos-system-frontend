import {useEffect, useState} from "react";
import {Category} from "../../models/category";
import classNames from "classnames";
import {isNil} from "lodash";
import {Product} from "../../models/product";
import {authFetchGet} from "../../hooks/authFetchGet";
import {useAuth} from "react-oidc-context";

function Settings() {
    const auth = useAuth();

    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, selectCategory] = useState<string | null>("ALL");
    const [products, setProducts] = useState<Product[]>([]);

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
            void authFetchGet("get_products_by_category", auth.user?.access_token)
                .catch(e => console.log(e))
                .then((res) => setProducts(res as Product[]));
        }
    }, [auth, setProducts, selectedCategory])

    return <div className={"flex flex-col w-full max-h-screen space-y-5"}>
        <div className={"flex flex-col w-full space-y-2"}>
            <h1 className={"text-xl font-bold"}>Menu Settings</h1>
            <div className={"flex flex-row space-x-4"}>
                <div onClick={() => selectCategory("ALL")}
                     className={classNames("cursor-pointer p-2 px-4 rounded-md", selectedCategory === "ALL" ? "bg-zinc-700 text-white" : "bg-zinc-300")}>
                    <p>ALL</p>
                </div>
                {categories.map((value) => {
                    return <div onClick={() => selectCategory(value.category)}
                                className={classNames("cursor-pointer p-2 px-4 rounded-md", selectedCategory === value.category ? "bg-zinc-700 text-white" : "bg-zinc-300")}>
                        <p>{value.category}</p>
                    </div>
                })}
            </div>
            <table>
                <tbody>
                <tr className={"text-center [&>*]:border"}>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Tax</th>
                    <th>Category</th>
                </tr>
                <>
                    {
                        products.map((product) => {
                            return <tr className={"text-center [&>*]:border"}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price.toFixed(2)}</td>
                                <td>{product.tax}</td>
                                <td>{product.category}</td>
                            </tr>
                        })
                    }
                </>
                </tbody>
            </table>
        </div>
        <div className={"flex flex-col w-full space-y-2"}>
            <h1 className={"text-xl font-bold"}>Tables Settings</h1>
        </div>
    </div>
}

export default Settings;