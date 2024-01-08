import {useEffect} from "react";
import {useAuth} from "oidc-react";

const Logout = () => {
    const auth = useAuth();

    useEffect(() => {
        auth.userManager.signoutRedirect({
            id_token_hint: auth.userData?.id_token,
            redirectTarget: "top",
        });
    }, [auth]);

    return null;
}

export default Logout;