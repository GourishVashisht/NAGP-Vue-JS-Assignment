export interface User {
    email: string;
    password: string;
    username?: string;
}

export interface UserResponse {
    email: string;
    token: string;
    username: string;
    bio?: string;
    image?: string;
}
