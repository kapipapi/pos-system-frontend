import {useEffect, useState} from "react";
import {Category, NewCategory} from "../../../../models/category";
import {authFetchGet, authFetchPost, authFetchPut} from "../../../../hooks/authFetch";
import {useAuth} from "oidc-react";
import {FaTrashCan} from "react-icons/fa6";
import {FaEdit, FaPlus} from "react-icons/fa";
import CategoryForm, {ModalState} from "./category-form";
import {DynamicIcon} from "./dynamic-icon";

const CategoriesSettings = () => {
    const auth = useAuth();
    let token = auth.userData?.access_token;

    const [modalState, setModalState] = useState<ModalState>(undefined);

    const [categories, setCategories] = useState<Category[]>([]);
    const fetchCategories = () => {
        authFetchGet<Category[]>("admin/categories", token)
            .then((res) => {
                setCategories(res)
            })
            .catch(e => console.error(e));
    }
    useEffect(fetchCategories, [setCategories, token])

    const onModalSubmit = (category: Category | NewCategory) => {
        if (modalState === "add") {
            onNewCategoryFormSubmit(category as NewCategory)
        } else {
            onEditCategoryFormSubmit(category as Category)
        }
    }

    const onNewCategoryFormSubmit = (newCategory: NewCategory) => {
        authFetchPost<Category[]>("admin/categories", token, newCategory)
            .then((res) => {
                setCategories(res)
            })
            .catch(err => console.error(err))
    }

    const onEditCategoryFormSubmit = (category: Category) => {
        authFetchPut<Category[]>("admin/categories", token, category)
            .then((res) => {
                setCategories(res)
            })
            .catch(err => console.error(err))
    }

    return (
        <div className={"flex flex-col w-full p-2"}>
            <div className={"flex flex-row mb-2 items-center"}>
                <CategoryForm isOpen={modalState !== undefined}
                              modalState={modalState}
                              closeModal={() => setModalState(undefined)}
                              onSubmit={onModalSubmit}
                />
                <div className={"space-x-2"}>
                    <button onClick={() => setModalState("add")}
                            className={"inline-flex items-center border rounded-md p-1"}>
                        Add
                        <FaPlus className={"ml-2"}/></button>
                </div>
            </div>
            <table>
                <thead>
                <tr className={"text-center [&>*]:border"}>
                    <th>Category</th>
                    <th>Icon</th>
                    <th>Color</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => {
                    return (
                        <tr className={"text-center [&>*]:border h-10"} key={category.id}>
                            <td>{category.name}</td>
                            <td><DynamicIcon name={category.icon} className={"text-2xl m-auto"}/></td>
                            <td style={{backgroundColor: category.color}}>{" "}</td>
                            <td>
                                <button
                                    onClick={() => setModalState(category)}
                                    className={"aspect-square border rounded-lg p-1"}
                                >
                                    <FaEdit/>
                                </button>
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