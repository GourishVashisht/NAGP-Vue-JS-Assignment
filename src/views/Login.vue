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

          <form v-on:submit.prevent="noop()">
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
            <button class="btn btn-lg btn-primary pull-xs-right" @click="loginUser()">Sign in</button>
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

  private async loginUser() {
    const user = {
      email: this.email,
      password: this.password
    };
    await users.loginUser(user);
    this.$router.push("/");
  }

  private noop() {
    // no implementation required
  }
}
</script>

<style scoped>
.login {
  margin-top: 60px;
}
</style>