<template>
  <div class="login auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign In</h1>
          <p class="text-xs-center">
            <router-link to="/register">Need an account?</router-link>
          </p>

          <ul class="error-messages">
            <li>That email is already taken</li>
          </ul>

          <form>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" @click="loginUser()">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import users from "@/store/modules/UserModule";

@Component
export default class Login extends Vue {
  private email: string = "";
  private password: string = "";

  private loginUser() {
    const user = {
      email: this.email,
      password: this.password
    };
    users
      .loginUser(user)
      .then((res) => {
        this.$router.push("/");
      })
      .catch((err) => {
        // console.warn(err);
      });
  }
}
</script>

<style scoped>
.login {
  margin-top: 60px;
}
</style>