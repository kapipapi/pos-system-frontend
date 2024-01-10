import {User} from "oidc-react";
import {isNil} from "lodash";

export const checkRole = (user: User | null | undefined) => {
    if (isNil(user)) {
        console.log("User is null or undefined")
        return false;
    }

    let userClaims = user.profile;

    if (!userClaims.hasOwnProperty("roles")) {
        console.log("User has no roles")
        return false
    }

    let roles = userClaims.roles as string[];

    return roles.includes("pos-admin");
}