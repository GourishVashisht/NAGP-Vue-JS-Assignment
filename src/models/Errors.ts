export interface RegisterFormErrors {
    username: string;
    email: string;
    password: string;
}

export interface LoginFormErrors {
    email: string;
    password: string;
}

export interface SettingsFormErrors {
    email: string;
    username: string;
}

export interface ArticleFormErrors {
    title: string;
    body: string;
    description: string;
}
