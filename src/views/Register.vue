<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link to="/login">Have an account?</router-link>
          </p>

          <form @submit.prevent="registerUser">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Username"
                v-model="username"
                minlength="1"
                maxlength="20"
                @keydown="removeErrorMessage(0)"
              />
            </fieldset>
            <div class="error-text error-messages">{{errors.username}}</div>

            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="email"
                minlength="1"
                @keydown="removeErrorMessage(1)"
              />
            </fieldset>
            <div class="error-text error-messages">{{errors.email}}</div>

            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="password"
                minlength="1"
                @keydown="removeErrorMessage(2)"
              />
            </fieldset>
            <div class="error-text error-messages">{{errors.password}}</div>

            <button class="btn btn-lg btn-primary pull-xs-right">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import users from "@/store/modules/UserModule";
import { User } from "@/models/User";
import { RegisterFormErrors } from "@/models/Errors";

@Component
export default class Register extends Vue {
  private username: string = "";
  private email: string = "";
  private password: string = "";
  private errors: RegisterFormErrors = {
    username: "",
    email: "",
    password: ""
  };

  private registerUser() {
    this.errors = {
      username: "",
      email: "",
      password: ""
    };
    const user: User = {
      email: this.email,
      password: this.password,
      username: this.username
    };
    users
      .registerUser(user)
      .then(() => {
        this.$router.push("/");
      })
      .catch((error) => {
        this.validateFormInputParameters(error.response.data.errors);
      });
  }

  private validateFormInputParameters(errors: any) {
    if (errors.username) {
      this.errors.username = "Username " + errors.username.join(" & ");
    }
    if (errors.email) {
      this.errors.email = "Email " + errors.email.join(" & ");
    }
    if (errors.password) {
      this.errors.password = "Password " + errors.password.join(" & ");
    }
  }

  private removeErrorMessage(fieldNumber: number): void {
    if (this.errors) {
      switch (fieldNumber) {
        case 0:
          this.errors!.username = "";
          break;
        case 1:
          this.errors!.email = "";
          break;
        case 2:
          this.errors!.password = "";
          break;
        default:
          break;
      }
    }
  }
}
</script>
