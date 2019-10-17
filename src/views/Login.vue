<template>
  <div class="login auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign In</h1>
          <p class="text-xs-center">
            <router-link to="/register">Need an account?</router-link>
          </p>

          <form>
            <div
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
            <div class="error-text error-messages">{{errors.email}}</div>

            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="password"
                @keydown="removeErrorMessage(1)"
              />
            </fieldset>
            <div class="error-text error-messages">{{errors.password}}</div>

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
import { LoginFormErrors } from "@/models/Errors";

@Component
export default class Login extends Vue {
  private email: string = "";
  private password: string = "";
  private genericError: string = "";
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
    const user = {
      email: this.email,
      password: this.password
    };
    users
      .loginUser(user)
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