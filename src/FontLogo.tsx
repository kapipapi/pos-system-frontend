import classNames from "classnames";

const FontLogo = ({ext}: { ext?: string }) => {
    return <p className={classNames("text-4xl text-white bg-zinc-800 px-4 p-1 rounded-lg self-center", ext ? "h-16" : "h-12")}>
        <p>POSPIZZA</p>
        {ext && <><p className={"text-xs text-bone text-center font-extrabold"}>{ext}</p></>}
    </p>
}

export default FontLogo;