import WeekView from "./components/WeekView";

function Reservations() {
    return (
        <div className={"flex flex-col w-full max-h-screen pr-12"}>
            <button className={"w-48 bg-zinc-800 text-white p-2 m-2 rounded-md"}>Add Reservation</button>
            <WeekView/>
        </div>
    )
}

export default Reservations;