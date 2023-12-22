import classNames from "classnames";

type Prop = {
    id: string,
    name: string,
    price: number,
    color: string,
    onClick: (id: string) => void,
}

function TileProduct({id, name, price, onClick, color}: Prop) {
    return <button
        className={classNames("snap-start flex flex-col h-full aspect-tile p-4 bg-bone rounded-md border-l-8", color)}
        onClick={() => onClick(id)}>
        <div className={"self-start text-left"}>
            <p className={"text-lg font-semibold"}>{name}</p>
            <p className={"text-sm text-zinc-400 font-light"}>{price.toFixed(2)} zł</p>
        </div>
        <div className={"mt-auto text-left"}>

        </div>
    </button>
}

export default TileProduct;
