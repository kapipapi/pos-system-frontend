import classNames from "classnames";
import {Product} from "../../../models/product";

type Prop = {
    product: Product,
    onClick: (id: string) => void,
}

function TileProduct({product, onClick}: Prop) {
    return <button
        className={classNames("snap-start flex flex-col h-full aspect-tile p-4 bg-bone rounded-md border-l-8")}
        style={{borderColor: product.category.color}}
        onClick={() => onClick(product.id)}>
        <div className={"self-start text-left"}>
            <p className={"text-lg font-semibold"}>{product.name}</p>
            <p className={"text-sm text-zinc-400 font-light"}>{product.price.toFixed(2)} zł</p>
        </div>
        <div className={"mt-auto text-left"}>

        </div>
    </button>
}

export default TileProduct;
