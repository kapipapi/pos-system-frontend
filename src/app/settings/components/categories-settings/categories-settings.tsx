import {useEffect, useState} from "react";
import {Category} from "../../../../models/category";
import {authFetchGet} from "../../../../hooks/authFetch";
import {useAuth} from "react-oidc-context";
import {FaTrashCan} from "react-icons/fa6";
import {FaPlus} from "react-icons/fa";

const CategoriesSettings = () => {
    const auth = useAuth();
    let token = auth.user?.access_token;

    const [modalState, setModalState] = useState(false);

    const [categories, setCategories] = useState<Category[]>([]);
    const fetchCategories = () => {
        authFetchGet<Category[]>("settings_view/categories", token)
            .then((res) => {
                setCategories(res)
            })
            .catch(e => console.error(e));
    }
    useEffect(fetchCategories, [setCategories, token])


    // const onNewProductFormSubmit = (newCategoryName: string) => {
    //     authFetchPost<Product>("settings_view/categories", token, newCategoryName)
    //         .then((res) => {
    //             fetchCategories()
    //         })
    //         .catch(err => console.error(err))
    // }

    return (
        <div className={"flex flex-col w-full p-2"}>
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
                <thead>
                <tr className={"text-center [&>*]:border"}>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => {
                    return (
                        <tr className={"text-center [&>*]:border h-10"} key={category.id}>
                            <td>{category.name}</td>
                            <td>
                                <button
                                    onClick={() => console.log(category.id)}
                                    className={"aspect-square border rounded-lg p-1"}
                                >
                                    <FaTrashCan/>
                                </button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default CategoriesSettings;