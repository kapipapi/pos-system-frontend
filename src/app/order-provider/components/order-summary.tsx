import PaymentMethods from "./payment-methods";

const OrderSummary = () => {

    return <div className={"flex flex-col p-4 rounded-md bg-zinc-800 text-white"}>
        <div className={"flex flex-row"}>
            <p className={"text-xl"}>Total:</p>
        </div>
        <div className={"border-b-2 border-dashed my-3 border-zinc-400"}></div>
        <PaymentMethods/>
        <button className={`bg-white text-zinc-950 rounded-full w-4/5 p-2 py-3 my-3 self-center disabled:text-gray-400`}>
            Place order
        </button>
    </div>
}

export default OrderSummary;