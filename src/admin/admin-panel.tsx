import {FC} from "react";
import { useAuth } from "oidc-react";
import {checkRole} from "../auth";

const AdminPanel: FC = () => {
    const auth = useAuth();

    return <div>
        <div>
            <p>Admin Panel</p>
            <p>Hi {auth.userData?.profile.preferred_username}!</p>
            <p>Apparently you
                are <strong>{checkRole(auth.userData) ? "admin" : "not admin"}</strong>!</p>
            <button onClick={() => auth.signOut()}>Logout</button>
        </div>
    </div>
}

export default AdminPanel;