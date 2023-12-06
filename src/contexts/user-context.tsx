import {createContext, Dispatch, ReactElement, SetStateAction, useEffect, useState} from 'react'
import {Outlet} from "react-router-dom";
import {User} from "../models/user";
import {authFetchGet} from "../hooks/authFetchGet";
import {useAuth} from "react-oidc-context";
import {isNil} from "lodash";

export type UserContextType = {
    usersList: User[],
    selectedUser?: string,
    selectUser: Dispatch<SetStateAction<string | undefined>>;
    isLoadingUsers: boolean,
    currentUser: User | undefined,
    checkPinCode: (code: string) => boolean,
    logout: () => void,
}

const defaultUserContext: UserContextType = {
    usersList: [],
    selectedUser: undefined,
    selectUser: () => {
    },
    isLoadingUsers: true,
    currentUser: undefined,
    checkPinCode: () => false,
    logout: () => {
    },
}

export const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserContextProvider = (): ReactElement => {
    const auth = useAuth();

    const [usersList, setUsersList] = useState<User[]>([]);
    const [isLoadingUsers, setLoadingUsers] = useState(true);
    const [selectedUser, selectUser] = useState<string>();
    const [currentUser, setCurrentUser] = useState<User | undefined>();

    useEffect(() => {
        authFetchGet<User[]>("users", auth.user?.access_token)
            .then((res) => {
                setUsersList(res);
                setLoadingUsers(false);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [auth]);

    const checkPinCode = (code: string): boolean => {
        if (code.length !== 4 || isNil(selectedUser)) {
            return false;
        }

        let user = usersList.find((value) => value.id === selectedUser);
        if (user === undefined) {
            return false;
        }

        if (user.code === code) {
            setCurrentUser(user);
            selectUser(undefined);
            return true;
        }

        return false;
    }

    const logout = () => {
        setCurrentUser(undefined);
    };

    return <UserContext.Provider value={{
        usersList,
        selectedUser,
        selectUser,
        isLoadingUsers,
        currentUser,
        checkPinCode,
        logout
    }}>
        <Outlet/>
    </UserContext.Provider>;
}