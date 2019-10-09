const JWT_TOKEN_KEY = "jwt_token_key";

export const getJWTToken = () => {
    return window.localStorage.getItem(JWT_TOKEN_KEY);
};

export const saveJWTToken = (token: string) => {
    window.localStorage.setItem(JWT_TOKEN_KEY, token);
};

export const destroyJWTToken = () => {
    window.localStorage.removeItem(JWT_TOKEN_KEY);
};

export default {
    getJWTToken,
    saveJWTToken,
    destroyJWTToken
};
