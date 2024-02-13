import WeekViewCalendar, {CalendarEvent} from "./components/WeekViewCalendar";
import moment from "moment";


function Reservations() {
    let events: CalendarEvent[] = [
        {
            start: moment([2024, 1, 13, 13, 0]),
            title: "10 osób",
            description: "553-019-123",
            location: "Duży stolik góra"
        },
        {
            start: moment([2024, 1, 13, 13, 0]),
            title: "2 osoby",
            description: "882-097-667",
            location: "Duży stolik góra"
        },
    ]

    return (
        <div className={"flex flex-col w-full max-h-screen pr-12"}>
            <button className={"w-48 bg-zinc-800 text-white p-2 m-2 rounded-md"}>Add Reservation</button>
            <WeekViewCalendar events={events}/>
        </div>
    )
}

export default Reservations;