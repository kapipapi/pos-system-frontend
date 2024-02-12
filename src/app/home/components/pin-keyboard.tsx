import {createContext, useContext, useEffect, useState} from "react";
import {UserContext} from "../../../contexts/user-context";

type KeyProps = {
    i: number
}

function Key({i}: KeyProps) {
    const {addCodeDigit} = useContext(PinKeyboardContext);

    return <button onClick={() => {
        addCodeDigit(i);
    }}>
        <div
            className={"flex w-28 text-2xl items-center justify-center aspect-square bg-zinc-500 rounded"}>{i === -1 ? "DEL" : i}</div>
    </button>
}

type PinKeyboardContextType = {
    addCodeDigit: (d: number) => void;
}
const PinKeyboardContext = createContext<PinKeyboardContextType>({
    addCodeDigit: () => {
    }
});

export default function PinKeyboard() {
    const {checkPinCode} = useContext(UserContext);

    const [code, setCode] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const addCodeDigit = (d: number) => {
        setCode(prevState => {
            if (prevState.length === 0) {
                setError(false);
            }

            if (d >= 0) {
                if (prevState.length < 4) {
                    return prevState + d.toString();
                } else {
                    return d.toString();
                }
            }

            if (d === -1) {
                return prevState.slice(0, code.length - 1)
            }

            return prevState
        });
    };

    useEffect(() => {
        if (code.length === 4) {
            setCode("");
            checkPinCode(code).then((isValid) => {
                if (!isValid) {
                    setError(true);
                }
            });
        }
    }, [code, setError, checkPinCode])

    useEffect(() => {
        setCode("");
        setError(false);
    }, [setCode]);

    return <div
        className={"flex flex-col col-span-1 bg-zinc-800 m-3 rounded-xl items-center justify-center space-y-12"}>
        <p className={"text-white"}>Enter your PIN</p>
        <div className={`flex space-x-8 ${error ? "[&>*]:bg-red-700" : ""}`}>
            <div className={`w-3 aspect-square rounded-full ${code.length > 0 ? "bg-white" : "bg-zinc-700"}`}></div>
            <div className={`w-3 aspect-square rounded-full ${code.length > 1 ? "bg-white" : "bg-zinc-700"}`}></div>
            <div className={`w-3 aspect-square rounded-full ${code.length > 2 ? "bg-white" : "bg-zinc-700"}`}></div>
            <div className={`w-3 aspect-square rounded-full ${code.length > 3 ? "bg-white" : "bg-zinc-700"}`}></div>
        </div>
        <div className={"grid grid-cols-3 text-white gap-2"}>
            <PinKeyboardContext.Provider value={{addCodeDigit}}>
                <Key i={1}/>
                <Key i={2}/>
                <Key i={3}/>
                <Key i={4}/>
                <Key i={5}/>
                <Key i={6}/>
                <Key i={7}/>
                <Key i={8}/>
                <Key i={9}/>
                <Key i={-1}/>
                <Key i={0}/>
            </PinKeyboardContext.Provider>
        </div>
    </div>
}
