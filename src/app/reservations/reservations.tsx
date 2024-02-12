import {useAuth} from "oidc-react";

function Reservations() {
    const auth = useAuth();
    let token = auth.userData?.access_token;

    return (
        <div className={"flex flex-col w-full max-h-screen"}>
            Reservations
        </div>
    )
}

export default Reservations;