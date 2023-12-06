import {BsCashCoin, BsFillCreditCardFill, BsFillPersonFill} from "react-icons/bs";

const PaymentMethods = () => {
return<div className={"flex flex-col"}>
    <p className={"text-sm text-zinc-300 mb-2"}>Payment method:</p>
    <div className={"grid grid-cols-3 gap-3 h-24 text-zinc-300"}>
        <button className={"flex flex-col w-full"}>
            <div className={"flex border rounded-md w-full h-full items-center justify-center"}>
                <BsCashCoin className={"text-3xl"}/>
            </div>
            <p className={"self-center text-sm mt-1"}>Cash</p>
        </button>
        <button className={"flex flex-col w-full"}>
            <div className={"flex border rounded-md w-full h-full items-center justify-center"}>
                <BsFillCreditCardFill className={"text-3xl"}/>
            </div>
            <p className={"self-center text-sm mt-1"}>Debit Card</p>
        </button>
        <button className={"flex flex-col w-full"}>
            <div className={"flex border rounded-md w-full h-full items-center justify-center"}>
                <BsFillPersonFill className={"text-4xl"}/>
            </div>
            <p className={"self-center text-sm mt-1"}>Other</p>
        </button>
    </div>
</div>
}

export default PaymentMethods;