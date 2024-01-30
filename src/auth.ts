import {User} from "oidc-react";
import {isNil} from "lodash";

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