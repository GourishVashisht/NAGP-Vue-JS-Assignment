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

    @MutationAction
    public async loginUser(user1: User) {
        const user: UserResponse = await UserService.loginUser(user1);
        JWTService.saveJWTToken(user.token);
        return { user, isAuthenticated: !!JWTService.getJWTToken() };
    }

    @MutationAction
    public async fetchUser() {
        const user: UserResponse = await UserService.fetchUser();
        JWTService.saveJWTToken(user.token);
        return { user, isAuthenticated: !!JWTService.getJWTToken() };
    }

    @MutationAction
    public async registerUser(user1: User) {
        const user: UserResponse = await UserService.registerUser(user1);
        JWTService.saveJWTToken(user.token);
        return { user, isAuthenticated: !!JWTService.getJWTToken() };
    }

    @Mutation
    public async logoutUser() {
        JWTService.destroyJWTToken();
        this.user = null;
        this.isAuthenticated = false;
    }
}

export default getModule(UserModule);
