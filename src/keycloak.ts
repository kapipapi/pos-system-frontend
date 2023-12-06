import {KeycloakConfig} from 'keycloak-js';

export const keycloakConfig: KeycloakConfig = {
    realm: 'pos-system',
    url: 'http://localhost:8888/',
    clientId: 'pos-system-react',
};
