import {Path, useForm} from "react-hook-form";

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
    const {register, handleSubmit, formState: {errors}} = useForm<T>();
    const fields = createFields<T>(default_values);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"border"}>
            {fields.map((field) => (
                <div key={String(field.name)}>
                    <label>{field.label}</label>
                    <input {...register(field.name as unknown as Path<T>, {valueAsNumber: field.type === "number", ...field.validation})}
                           type={field.type}/>
                </div>
            ))}
            <button type="submit" className={"border"}>Submit</button>
        </form>
    );
};

export default GenericForm;