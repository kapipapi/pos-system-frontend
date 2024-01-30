import EmployeeList from "./components/employee-list";
import PinKeyboard from "./components/pin-keyboard";
import {useContext} from "react";
import {UserContext} from "../../contexts/user-context";
import {Navigate} from "react-router-dom";
import {isNil} from "lodash";

function Home() {
    const {currentUser} = useContext(UserContext);

    if (!isNil(currentUser)) {
        return <Navigate to="/app/menu"/>
    }

    return (
        <div className={"grid grid-cols-2 w-full"}>
            <div className={"flex flex-col w-full px-10"}>
                <p className={"mt-8 self-center"}>{new Date().toLocaleDateString()}</p>
                <hr className={"my-4"}/>
                <EmployeeList/>
            </div>
            <PinKeyboard/>
        </div>
    )
}

export default Home;
