import axios from "axios";

export const api = axios.create({
    baseURL: "https://conduit.productionready.io/api"
});

export function setJWT(jwt: string) {
    api.defaults.headers.common.Authorization = `Token ${jwt}`;
}

export function removeJWT() {
    delete api.defaults.headers.common.Authorization;
}

