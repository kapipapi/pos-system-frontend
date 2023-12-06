type Prop = {
    id: string,
    name: string,
    price: number,
    active?: boolean,
    onClick: (id: string) => void,
}

function TileCategory({id, name, price, active, onClick}: Prop) {
    return <button
        className={`snap-start flex flex-col h-full aspect-square p-4 border-2 border-zinc-800 ${active ? "bg-white text-zinc-800" : "bg-zinc-800 text-white"} rounded-md`}
        onClick={() => onClick(id)}>
        <div className={"self-start"}>
            <p className={"text-md text-left"}>{name}</p>
        </div>
        <div className={"mt-auto text-left"}>
            <p className={"text-sm"}>{price.toFixed(2)} zł</p>
        </div>
    </button>
}

export default TileCategory;
