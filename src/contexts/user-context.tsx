import {createContext, Dispatch, ReactElement, SetStateAction, useEffect, useState} from 'react'
import {Outlet} from "react-router-dom";
import {User} from "../models/user";
import {authFetchGet, authFetchPost} from "../hooks/authFetch";
import {useAuth} from "react-oidc-context";
import {isNil} from "lodash";

export type UserContextType = {
    usersList: User[],
    selectedUser?: string,
    selectUser: Dispatch<SetStateAction<string | undefined>>;
    isLoadingUsers: boolean,
    currentUser: User | undefined,
    checkPinCode: (code: string) => Promise<boolean>,
    logout: () => void,
}

type CheckUserPinResult = {
    authorized: boolean,
}

const defaultUserContext: UserContextType = {
    usersList: [],
    selectedUser: undefined,
    selectUser: () => {
    },
    isLoadingUsers: true,
    currentUser: undefined,
    checkPinCode: () => Promise.resolve(false),
    logout: () => {
    },
}

export const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserContextProvider = (): ReactElement => {
    const auth = useAuth();

    const [usersList, setUsersList] = useState<User[]>([]);
    const [isLoadingUsers, setLoadingUsers] = useState(true);
    const [selectedUser, setSelectedUser] = useState<string>();
    const [currentUser, setCurrentUser] = useState<User | undefined>();

    useEffect(() => {
        authFetchGet<User[]>("user_context/list_users", auth.user?.access_token)
            .then((res) => {
                setUsersList(res);
                setLoadingUsers(false);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [auth]);

    const checkPinCode = async (code: string): Promise<boolean> => {
        if (code.length !== 4 || isNil(selectedUser)) {
            return false;
        }

        let user = usersList.find((value) => value.id === selectedUser);
        if (user === undefined) {
            return false;
        }

        return authFetchPost<CheckUserPinResult>("user_context/check_pin", auth.user?.access_token, {
            user_id: selectedUser,
            code: code
        })
            .then((res) => {
                if(res.authorized){
                    setCurrentUser(user);
                    setSelectedUser(undefined);
                    return res.authorized;
                }
                return false;
            })
            .catch(() => {
                return false;
            });
    }

    const logout = () => {
        setCurrentUser(undefined);
    };

    return <UserContext.Provider value={{
        usersList,
        selectedUser,
        selectUser: setSelectedUser,
        isLoadingUsers,
        currentUser,
        checkPinCode,
        logout
    }}>
        <Outlet/>
    </UserContext.Provider>;
}