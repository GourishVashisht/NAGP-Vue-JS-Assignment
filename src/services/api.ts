import axios from "axios";

const AUTHORIZATION: string = "Authorization";

export const api = axios.create({
    baseURL: "https://conduit.productionready.io/api"
});

export function setJWT(jwt: string) {
    if (jwt) {
        api.defaults.headers.common[AUTHORIZATION] = `Token ${jwt}`;
    }
}

export function removeJWT() {
    delete api.defaults.headers.common.Authorization;
}

