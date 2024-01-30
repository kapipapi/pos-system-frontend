import {createContext, ReactElement, useEffect, useState} from 'react'
import {Outlet} from "react-router-dom";
import {Waiter} from "../models/waiter";
import {authFetchGet} from "../hooks/authFetch";
import {useAuth} from "oidc-react";

export type UserContextType = {
    usersList: Waiter[],
    currentUser: Waiter | undefined,
    checkPinCode: (code: string) => Promise<boolean>,
    logout: () => void,
}

const defaultUserContext: UserContextType = {
    usersList: [],
    currentUser: undefined,
    checkPinCode: () => Promise.resolve(false),
    logout: () => {
    },
}

export const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserContextProvider = (): ReactElement => {
    const auth = useAuth();

    const [usersList, setUsersList] = useState<Waiter[]>([]);
    const [currentUser, setCurrentWaiter] = useState<Waiter | undefined>();

    useEffect(() => {
        authFetchGet<Waiter[]>("waiters", auth.userData?.access_token)
            .then((res) => {
                setUsersList(res);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [auth]);

    const checkPinCode = async (code: string): Promise<boolean> => {
        if (code.length !== 4) {
            return false;
        }

        return authFetchGet<Waiter>("waiters/" + code, auth.userData?.access_token)
            .then((waiter) => {
                setCurrentWaiter(waiter);
                return true;
            })
            .catch(() => {
                return false;
            });
    }

    const logout = () => {
        setCurrentWaiter(undefined);
    };

    return <UserContext.Provider value={{
        usersList,
        currentUser,
        checkPinCode,
        logout
    }}>
        <Outlet/>
    </UserContext.Provider>;
}