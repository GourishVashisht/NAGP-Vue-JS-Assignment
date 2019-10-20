import {
    VuexModule, Module, getModule, Mutation, MutationAction
} from "vuex-module-decorators";
import store from "@/store";
import { UserResponse, User } from "@/models/User";
import { UserService } from "@/services/UserService";
import JWTService from "@/services/JWTService";

@Module({
    dynamic: true,
    name: "users",
    store
})
class UserModule extends VuexModule {

    public isAuthenticated: boolean = false;
    public user: UserResponse | null = null;

    get username() {
        return this.user ? this.user.username : null;
    }

    @Mutation
    public async logoutUser() {
        JWTService.destroyJWTToken();
        this.user = null;
        this.isAuthenticated = false;
    }

    @MutationAction({ mutate: ["user", "isAuthenticated"], rawError: true })
    public async loginUser(user: User) {
        try {
            const userResponse: UserResponse = await UserService.loginUser(user);
            JWTService.saveJWTToken(userResponse.token);
            return { user: userResponse, isAuthenticated: !!JWTService.getJWTToken() };
        } catch (error) {
            throw error;
        }
    }

    @MutationAction({ mutate: ["user", "isAuthenticated"], rawError: true })
    public async registerUser(user: User) {
        try {
            const userResponse: UserResponse = await UserService.registerUser(user);
            JWTService.saveJWTToken(userResponse.token);
            return { user: userResponse, isAuthenticated: !!JWTService.getJWTToken() };
        } catch (error) {
            throw error;
        }
    }

    @MutationAction({ mutate: ["user", "isAuthenticated"], rawError: true })
    public async modifyUser(user: UserResponse | null) {
        try {
            const userResponse: UserResponse = await UserService.modifyUser(user);
            JWTService.saveJWTToken(userResponse.token);
            return { user: userResponse, isAuthenticated: !!JWTService.getJWTToken() };
        } catch (error) {
            throw error;
        }
    }

    @MutationAction({ mutate: ["user", "isAuthenticated"], rawError: true })
    public async fetchUser() {
        try {
            const userResponse: UserResponse = await UserService.fetchUser();
            JWTService.saveJWTToken(userResponse.token);
            return { user: userResponse, isAuthenticated: !!JWTService.getJWTToken() };
        } catch (error) {
            throw error;
        }
    }
}

export default getModule(UserModule);
