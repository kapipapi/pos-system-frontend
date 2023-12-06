import React, {
    FC,
    Dispatch,
    useState,
    useEffect,
    useContext,
    useCallback,
    createContext,
    SetStateAction, ReactElement,
} from 'react';
import Keycloak from "keycloak-js";
import {isNil} from "lodash";
import {keycloakConfig} from "../keycloak";

interface KeycloakContextT {
    initialized: boolean;
    authHeader: {
        Authorization: string;
    };
    keycloak: Keycloak;
}

const KeycloakContext = createContext<KeycloakContextT>({
    initialized: false,
    authHeader: {Authorization: ''},
    keycloak: {} as Keycloak,
});


type KeycloakProviderT = {
    children: ReactElement;
    loadingComponent: ReactElement;
};

export const KeycloakProvider: FC<KeycloakProviderT> = ({children, loadingComponent}) => {
    const [keycloak, setKeycloak] = useState<Keycloak>();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const keycloak = new Keycloak(keycloakConfig);
        keycloak
            .init({
                onLoad: 'check-sso',
            })
            .then((status) => {
                setAuthenticated(status);
            })
            .catch((error) => {
                console.error("Keycloak initialization error:", error);
            })

        setKeycloak(keycloak);
    }, []);

    if (!authenticated || isNil(keycloak)) {
        return loadingComponent;
    }

    const authHeader = {
        Authorization: keycloak.token ? `Bearer ${keycloak.token}` : '',
    };

    return (
        <KeycloakContext.Provider
            value={{
                authHeader,
                initialized: authenticated,
                keycloak
            }}
        >
            {children}
        </KeycloakContext.Provider>
    );
};

export const useKeycloak = (): KeycloakContextT => useContext(KeycloakContext);
