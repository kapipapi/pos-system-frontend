import React, {useEffect} from 'react';
import {useAuth} from "react-oidc-context";
import {RouterProvider} from "react-router-dom";
import {routes} from "./routes";

function App() {
    const auth = useAuth();

    useEffect(() => {
        if (!auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading) {
            auth.signinRedirect();
        }
    }, [auth]);

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (!auth.isAuthenticated) {
        auth.signinRedirect();
    }

    return  <RouterProvider router={routes}/>;
}

export default App;
