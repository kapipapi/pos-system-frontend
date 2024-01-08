import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {AuthProvider} from 'oidc-react';
import {RouterProvider} from "react-router-dom";
import {routes} from "./routes";

const oidcConfig = {
    authority: "http://localhost:8888/realms/pos-system",
    clientId: "pos-system-react",
    redirectUri: "http://localhost:3000/app",
    autoSignIn: true,
};

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <AuthProvider {...oidcConfig}>
            <RouterProvider router={routes}/>
        </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
