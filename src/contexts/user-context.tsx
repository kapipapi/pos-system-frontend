import {createContext, ReactElement, useEffect, useMemo, useState} from 'react'
import {Outlet} from "react-router-dom";
import {Waiter} from "../models/waiter";
import {authFetchGet} from "../hooks/authFetch";
import {useAuth} from "oidc-react";
import Cookies from 'universal-cookie';
import {isNil} from "lodash";


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

const WAITER_COOKIE_NAME = "waiter_code";
export const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserContextProvider = (): ReactElement => {
    const auth = useAuth();

    const cookies = useMemo(() => new Cookies(null, {path: '/', maxAge: 60 * 24 * 7, sameSite: 'strict'}), []);

    const [usersList, setUsersList] = useState<Waiter[]>([]);
    const [currentUser, setCurrentWaiter] = useState<Waiter | undefined>();

    const logUserWithCookieCode = useMemo(() => (waiterCode: string) => {
        authFetchGet<Waiter>("waiters/" + waiterCode, auth.userData?.access_token)
            .then((waiter) => {
                setCurrentWaiter(waiter);
            })
            .catch(() => {
                cookies.remove(WAITER_COOKIE_NAME);
            });
    }, [cookies, auth, setCurrentWaiter]);

    const fetchAllWaiters = useMemo(() => () => {
        authFetchGet<Waiter[]>("waiters", auth.userData?.access_token)
            .then((res) => {
                setUsersList(res);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [setUsersList, auth]);

    useEffect(() => {
        let waiterCode = cookies.get<string>(WAITER_COOKIE_NAME);

        if (!isNil(waiterCode)) {
            logUserWithCookieCode(waiterCode);
        } else {
            cookies.remove(WAITER_COOKIE_NAME);
            fetchAllWaiters();
        }
    }, [auth, cookies, logUserWithCookieCode, fetchAllWaiters]);

    const checkPinCode = async (code: string): Promise<boolean> => {
        if (code.length !== 4) {
            return false;
        }

        return authFetchGet<Waiter>("waiters/" + code, auth.userData?.access_token)
            .then((waiter) => {
                cookies.set(WAITER_COOKIE_NAME, code);
                setCurrentWaiter(waiter);
                return true;
            })
            .catch(() => {
                return false;
            });
    }

    const logout = () => {
        cookies.remove(WAITER_COOKIE_NAME);
        setCurrentWaiter(undefined);
        fetchAllWaiters();
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