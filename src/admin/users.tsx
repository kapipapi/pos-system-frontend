import {useAuth} from "oidc-react";
import {useEffect, useState} from "react";
import {Product} from "../models/product";
import {authFetchGet} from "../hooks/authFetch";
import {FaPlus} from "react-icons/fa";

const Users = () => {
    const auth = useAuth();
    let token = auth.userData?.access_token;

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

    return <div className={"flex flex-col w-full p-2"}>
        <div className={"flex flex-row mb-2 items-center"}>
            {/*<NewProductForm modalState={modalState} closeModal={() => setModalState(false)}*/}
            {/*                onSubmit={onNewProductFormSubmit}/>*/}
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
                            <td></td>
                        </tr>
                    })
                }
            </>
            </tbody>
        </table>
    </div>
}

export default Users;