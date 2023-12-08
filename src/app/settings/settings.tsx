import {useEffect, useState} from "react";
import {NewProduct, Product} from "../../models/product";
import {authFetchDelete, authFetchGet, authFetchPost} from "../../hooks/authFetch";
import {useAuth} from "react-oidc-context";
import {FaPlus} from "react-icons/fa";
import {FaTrashCan} from "react-icons/fa6";

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
        const newProduct: NewProduct = {
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

    const removeRow = (id: string) => {
        authFetchDelete(`products/${id}`, token)
            .then((res) => {
                console.log(res)
                fetchProducts()
            })
            .catch(err => console.error(err))
    }

    return <div
        className={"flex flex-col w-full h-full max-h-screen space-y-5 overflow-y-scroll overflow-x-hidden no-scrollbar pr-2"}>
        <div className={"flex flex-col w-full space-y-2"}>
            <div className={"flex flex-row mt-5 mb-2 items-center"}>
                <h1 className={"text-xl font-bold"}>Menu Settings</h1>
                <div className={"ml-auto mr-10 space-x-2"}>
                    <button onClick={() => addEmptyRow()}
                            className={"inline-flex items-center border rounded-md p-1"}>Add <FaPlus
                        className={"ml-2"}/></button>
                </div>
            </div>
            <table>
                <tbody>
                <tr className={"text-center [&>*]:border"}>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Tax</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                <>
                    {
                        products.map((product) => {
                            return <tr className={"text-center [&>*]:border h-10"} key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price.toFixed(2)}</td>
                                <td>{product.tax}</td>
                                <td>{product.category}</td>
                                <td>{product.description}</td>
                                <td>
                                    <button
                                        onClick={() => removeRow(product.id)}
                                        className={"aspect-square border rounded-full p-1"}
                                    >
                                        <FaTrashCan/>
                                    </button>
                                </td>
                            </tr>
                        })
                    }
                </>
                </tbody>
            </table>
        </div>
    </div>
}

export default Settings;