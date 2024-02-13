import {range} from "lodash";
import React, {FC} from "react";
import {PiClock} from "react-icons/pi";
import moment from 'moment';
import 'moment/locale/pl';
import classNames from "classnames";

moment.locale("pl");

const HeaderCell: FC<{ children: React.JSX.Element }> = ({children}) => {
    return <div
        className={"flex justify-center items-center h-10 border-l border-b border-t bg-[#f4f4f4] text-[#303030]"}>{children}</div>
}

const SubHeaderCell: FC<{ children: React.JSX.Element }> = ({children}) => {
    return <div className={"h-8 border-l border-b"}>{children}</div>
}

const Cell: FC<{ children: React.JSX.Element }> = ({children}) => {
    return <div className={"block h-20 border-t border-l overflow-hidden hover:overflow-visible"}>{children}</div>
}

const TimeColumn = () => {
    return <div className={"col-span-1 grid grid-rows-14"}>
        <HeaderCell>
            <PiClock className={"text-2xl"}/>
        </HeaderCell>
        <SubHeaderCell>
            <div className={"flex h-full justify-center items-center"}>
                <span className={"text-sm font-semibold"}>ALL DAY</span>
            </div>
        </SubHeaderCell>
        {range(10, 22).map((i) => {
            return <Cell key={i}>
                <div className={"flex justify-center p-1 font-bold text-[#303030]"}>
                    <span className={"text-base"}>{i}</span>
                    <span className={"text-[0.6rem] pt-[0.15rem]"}>00</span></div>
            </Cell>
        })}
    </div>

}

const DayHourCellEvent: FC<{ event: CalendarEvent }> = ({event}) => {
    return <div className={"w-full h-full bg-[#c2d2f4] p-1 rounded z-20"}>
        <p className={"text-base leading-4"}>{event.title}</p>
        <p className={"text-xs leading-3"}>{event.description}</p>
        <p className={"text-xs leading-3"}>{event.location}</p>
    </div>

}

const DayHourCell: FC<{ day: moment.Moment, eventsForHour: CalendarEvent[] }> = ({day, eventsForHour}) => {
    return <div
        className={classNames("text-xs h-full grid gap-0.5 p-0.5 items-center justify-center", eventsForHour.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
        {eventsForHour.map((event, i) => {
            return <DayHourCellEvent key={i} event={event}/>
        })}
    </div>
}

const DayColumn: FC<{ day: moment.Moment, eventsForDay: CalendarEvent[] }> = ({day, eventsForDay}) => {
    let isToday = day.isSame(moment(), "day");

    return <div className={"col-span-1 grid grid-rows-14"}>
        <HeaderCell>
            <div className={classNames("font-light", {"font-semibold": isToday})}>{day.format("dd DD MMMM")}</div>
        </HeaderCell>
        <SubHeaderCell>
            <div></div>
        </SubHeaderCell>
        {range(10, 22).map((i) => {
            let dayHour = day.clone().startOf("day").hour(i).minute(0).second(0);

            let eventsForHour = eventsForDay.filter((event) => {
                return event.start.isSame(dayHour, "hour");
            });

            return <Cell key={i}>
                <DayHourCell day={dayHour} eventsForHour={eventsForHour}/>
            </Cell>
        })}
    </div>
}

export interface CalendarEvent {
    start: moment.Moment;
    title: string;
    description: string;
    location: string;
}

const WeekViewCalendar: FC<{ events: CalendarEvent[] }> = ({events}) => {
    return (
        <div className={"grid grid-cols-16 w-full last:border-b"}>
            <TimeColumn/>
            <div className={"col-span-15 grid grid-cols-5 border-r"}>
                {range(0, 5).map((i) => {
                    let columnDate = moment().add(i, 'days').startOf("day");

                    let eventsForDay = events.filter((event) => {
                        return event.start.isSame(columnDate, "day");
                    });

                    return <DayColumn key={i} day={columnDate} eventsForDay={eventsForDay}/>
                })}
            </div>
        </div>
    );
}

export default WeekViewCalendar;
