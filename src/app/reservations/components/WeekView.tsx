import {range} from "lodash";
import React, {FC} from "react";
import {PiClock} from "react-icons/pi";
import moment from 'moment';
import 'moment/locale/pl';

moment.locale("pl");

const HeaderCell: FC<{ children: React.JSX.Element }> = ({children}) => {
    return <div className={"flex justify-center items-center h-10 border-l border-b border-t bg-[#f4f4f4] text-[#303030]"}>{children}</div>
}

const SubHeaderCell: FC<{ children: React.JSX.Element }> = ({children}) => {
    return <div className={"h-8 border-l border-b"}>{children}</div>
}

const Cell: FC<{ children: React.JSX.Element }> = ({children}) => {
    return <div className={"h-16 border-t border-l"}>{children}</div>
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
                    <span className={"text-md"}>{i}</span>
                    <span className={"text-[0.6rem] pt-[0.15rem]"}>00</span></div>
            </Cell>
        })}
    </div>

}
const DayColumn: FC<{ day: moment.Moment }> = ({day}) => {
    return <div className={"col-span-1 grid grid-rows-14"}>
        <HeaderCell>
            <div>{day.format("DD dddd")}</div>
        </HeaderCell>
        <SubHeaderCell>
            <div></div>
        </SubHeaderCell>
        {range(10, 22).map((i) => {
            return <Cell key={i}>
                <div></div>
            </Cell>
        })}
    </div>
}
const WeekView = () => {
    return (
        <div className={"grid grid-cols-16 w-full last:border-b"}>
            <TimeColumn/>
            <div className={"col-span-15 grid grid-cols-5 border-r"}>
                {range(0, 5).map((i) => {
                    return <DayColumn key={i} day={moment().add(i, 'days')}/>
                })}
            </div>
        </div>
    );
}

export default WeekView;