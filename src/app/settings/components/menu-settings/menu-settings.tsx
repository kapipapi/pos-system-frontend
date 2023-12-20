import {FaTrashCan} from "react-icons/fa6";
import {useAuth} from "react-oidc-context";
import {useEffect, useState} from "react";
import {NewProduct, Product} from "../../../../models/product";
import {authFetchDelete, authFetchGet, authFetchPost} from "../../../../hooks/authFetch";
import NewProductForm from "./new-product-form";
import {FaPlus} from "react-icons/fa";

const MenuSettings = () => {
    const auth = useAuth();
    let token = auth.user?.access_token;

    const [products, setProducts] = useState<Product[]>([]);
    const [modalState, setModalState] = useState(false);

    const fetchProducts = () => {
        authFetchGet<Product[]>("settings_view/products", token)
            .then((res) => {
                setProducts(res)
            })
            .catch(e => console.error(e));
    }
    useEffect(fetchProducts, [setProducts, token])

    const onNewProductFormSubmit = (newProduct: NewProduct) => {
        authFetchPost<Product>("settings_view/products", token, newProduct)
            .then((res) => {
                console.log(res)
                fetchProducts()
            })
            .catch(err => console.error(err))
    }

    const removeRow = (id: string) => {
        authFetchDelete(`settings_view/products/${id}`, token)
            .then((res) => {
                console.log(res)
                fetchProducts()
            })
            .catch(err => console.error(err))
    }

    return (
        <div className={"flex flex-col w-full p-2"}>
            <div className={"flex flex-row mb-2 items-center"}>
                <NewProductForm modalState={modalState} closeModal={() => setModalState(false)}
                                onSubmit={onNewProductFormSubmit}/>
                <div className={"space-x-2"}>
                    <button onClick={() => setModalState(true)}
                            className={"inline-flex items-center border rounded-md p-1"}>
                        Add
                        <FaPlus className={"ml-2"}/></button>
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
                            return <tr className={"text-center [&>*]:border h-14"} key={product.id}>
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
    );
}

export default MenuSettings;