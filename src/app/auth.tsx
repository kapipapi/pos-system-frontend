import {Navigate, Outlet} from 'react-router-dom';
import {useContext} from "react";
import {UserContext} from "../contexts/user-context";

const AuthGuard = () => {
    const {currentUser} = useContext(UserContext);

    return currentUser ? <Outlet/> : <Navigate to="/"/>;
}

export default AuthGuard;