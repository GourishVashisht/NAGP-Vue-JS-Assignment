<template>
  <div class="login auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign In</h1>
          <p class="text-xs-center">
            <router-link to="/register">Need an account?</router-link>
          </p>

          <form @submit.prevent="loginUser">
            <div
              id="generic-error"
              class="error-text error-messages"
              style="text-decoration: underline"
            >{{genericError}}</div>

            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="email"
                @keydown="removeErrorMessage(0)"
              />
            </fieldset>
            <div id="email-error" class="error-text error-messages">{{errors.email}}</div>

            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="password"
                @keydown="removeErrorMessage(1)"
              />
            </fieldset>
            <div id="password-error" class="error-text error-messages">{{errors.password}}</div>

            <button id="sign-in-button" class="btn btn-lg btn-primary pull-xs-right">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import users from "@/store/modules/UserModule";
import { LoginFormErrors } from "@/models/Errors";
import { User } from "@/models/User";

@Component
export default class Login extends Vue {
  private email: string = "";
  private password: string = "";
  private genericError: string = "";
  private user: User = {
    email: "",
    password: ""
  };
  private errors: LoginFormErrors = {
    email: "",
    password: ""
  };

  private loginUser() {
    this.genericError = "";
    this.errors = {
      email: "",
      password: ""
    };
    this.user = {
      email: this.email,
      password: this.password
    };
    users
      .loginUser(this.user)
      .then(() => {
        this.$router.push("/");
      })
      .catch((error) => {
        this.validateFormInputParameters(error.response.data.errors);
      });
  }

  private validateFormInputParameters(errors: any) {
    if (errors["email or password"]) {
      if (!this.email) {
        this.errors.email = "Email " + errors["email or password"];
      }
      if (!this.password) {
        this.errors.password = "Password " + errors["email or password"];
      }
      if (this.email && this.password) {
        this.genericError =
          "Either email or password " + errors["email or password"];
      }
    }
  }

  private removeErrorMessage(fieldNumber: number): void {
    if (this.errors) {
      switch (fieldNumber) {
        case 0:
          this.errors!.email = "";
          break;
        case 1:
          this.errors!.password = "";
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style scoped>
.login {
  margin-top: 60px;
}
</style>