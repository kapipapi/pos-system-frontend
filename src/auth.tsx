import {useAuth, User} from "oidc-react";
import {isNil} from "lodash";
import React, {FC} from "react";

export const AppAuth: FC<{ children: React.JSX.Element }> = ({children}) => {
    const auth = useAuth();

    if (auth.isLoading) {
        return <></>
    }

    return <>{children}</>
}

export const checkRole = (user: User | null | undefined) => {
    if (isNil(user)) {
        console.log("Waiter is null or undefined")
        return false;
    }

    let userClaims = user.profile;

    if (!userClaims.hasOwnProperty("roles")) {
        console.log("Waiter has no roles")
        return false
    }

    let roles = userClaims.roles as string[];

    return roles.includes("pos-admin");
}