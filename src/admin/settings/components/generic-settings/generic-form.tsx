import {Path, useForm} from "react-hook-form";
import {upperFirst} from "lodash";

type Props<T> = {
    default_values: T;
    onSubmit: (data: T) => void;
};

type FieldConfig<T> = {
    name: keyof T;
    label: string;
    type: string;
    validation: any;
};

function createFields<T extends object>(default_values: T): FieldConfig<T>[] {
    const keys = (Object.keys(default_values) as Array<keyof T>);
    const values = (Object.values(default_values) as Array<keyof T>);

    return keys.map((key, index) => ({
            name: key as keyof T,
            label: String(key),
            type: (typeof values[index]),
            validation: {required: true},
        })
    );
}

const GenericForm = <T extends object, >({onSubmit, default_values}: Props<T>) => {
    const {register, handleSubmit} = useForm<T>();
    const fields = createFields<T>(default_values);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"grid grid-cols-3 w-full md:w-1/2 lg:w-1/3 mx-auto border p-3"}>
            {fields.map((field) => (
                    <>
                        <label className={"text-center my-auto"}>{upperFirst(field.label)}</label>
                        <input {...register(field.name as unknown as Path<T>, {valueAsNumber: field.type === "number", ...field.validation})}
                               type={field.type} className={"border col-span-2 p-1 m-1 rounded-md"}/>
                    </>
                )
            )}
            <button type="submit" className={"col-span-3 w-1/2 mx-auto mt-5 p-2 bg-green-200 rounded-md"}>Submit</button>
        </form>
    )
        ;
};

export default GenericForm;