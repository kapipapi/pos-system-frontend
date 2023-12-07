import {useEffect, useState} from "react";
import {Product} from "../../models/product";
import {authFetchGet, authFetchPost} from "../../hooks/authFetch";
import {useAuth} from "react-oidc-context";
import {FaPlus} from "react-icons/fa";
import {isNil} from "lodash";

function Settings() {
    const auth = useAuth();

    let token = auth.user?.access_token;

    const [products, setProducts] = useState<Product[]>([]);

    const fetchProducts = () => {
        authFetchGet<Product[]>("products", token)
            .then((res) => {
                setProducts(res)
            })
            .catch(e => console.error(e));
    }
    useEffect(fetchProducts, [setProducts, token])

    const addEmptyRow = () => {
        const newProduct: Product = {
            id: undefined,
            name: "Kurczak",
            price: 20,
            tax: 8,
            category: "KURCZAK",
            description: "Super kurczak wariacie",
        }

        authFetchPost<Product>("products", token, newProduct)
            .then((res) => {
                console.log(res)
                fetchProducts()
            })
            .catch(err => console.error(err))
    }

    return <div className={"flex flex-col w-full max-h-screen space-y-5"}>
        <div className={"flex flex-col w-full space-y-2"}>
            <h1 className={"text-xl font-bold"}>Menu Settings</h1>
            <table>
                <tbody>
                <tr className={"text-center [&>*]:border"}>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Tax</th>
                    <th>Category</th>
                    <th>Description</th>
                </tr>
                <>
                    {
                        products.map((product) => {
                            return <tr className={"text-center [&>*]:border"} key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price.toFixed(2)}</td>
                                <td>{product.tax}</td>
                                <td>{product.category}</td>
                                <td>{product.description}</td>
                            </tr>
                        })
                    }
                </>
                </tbody>
            </table>
            <button onClick={() => addEmptyRow()}><FaPlus className={"m-auto"}/></button>
        </div>
    </div>
}

export default Settings;