import {
    VuexModule, Module, getModule, Action, Mutation, MutationAction
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

    public user: UserResponse | null = null;

    get username() {
        // const data = JSON.parse(String(localStorage.getItem("vuex")));
        // console.log(data.users.user.username);
        // return (data && data.users && data.users.user) ? data.users.user.username : null;
        return (this.user) ? this.user.username : null;
    }

    @MutationAction
    public async loginUser(user1: User) {
        const user: UserResponse = await UserService.loginUser(user1);
        JWTService.saveJWTToken(user.token);
        return { user };
    }

    @MutationAction
    public async fetchUser() {
        const user: UserResponse = await UserService.fetchUser();
        JWTService.saveJWTToken(user.token);
        return { user };
    }

    @MutationAction
    public async registerUser(user1: User) {
        const user: UserResponse = await UserService.registerUser(user1);
        JWTService.saveJWTToken(user.token);
        return { user };
    }

    @Mutation
    public async logoutUser() {
        JWTService.destroyJWTToken();
        this.user = null;
    }
}

export default getModule(UserModule);
