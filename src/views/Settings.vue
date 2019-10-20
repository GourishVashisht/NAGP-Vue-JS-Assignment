<template>
  <div class="settings-page" v-if="user">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h2 class="text-xs-center">Your Settings</h2>

          <form>
            <ul class="error-text">
              <li class="error-text error-messages" v-if="errors.username">{{errors.username}}</li>
              <li class="error-text error-messages" v-if="errors.email">{{errors.email}}</li>
            </ul>

            <fieldset class="form-group first-fieldset">
              <input
                class="form-control"
                type="text"
                v-model="user.image"
                placeholder="URL of profile picture"
              />
            </fieldset>

            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.username"
                placeholder="Your Name"
              />
            </fieldset>

            <fieldset class="form-group">
              <textarea
                class="form-control form-control-lg"
                rows="8"
                v-model="user.bio"
                placeholder="Short bio about you"
                spellcheck="false"
              ></textarea>
            </fieldset>

            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.email"
                placeholder="Email"
              />
            </fieldset>

            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="user.password"
                placeholder="Password"
              />
            </fieldset>

            <button
              class="btn btn-lg btn-primary pull-xs-right"
              type="button"
              @click="updateUserSettings()"
            >Update Settings</button>
          </form>
          <hr />
          <button
            class="btn btn-outline-danger"
            type="button"
            @click="signoutUser()"
          >Or click here to logout.</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import users from "@/store/modules/UserModule";
import { SettingsFormErrors } from "@/models/Errors";
import { UserResponse } from "@/models/User";

@Component
export default class Settings extends Vue {
  private user: UserResponse | null = {} as UserResponse;
  private errors: SettingsFormErrors = {
    email: "",
    username: ""
  };

  private async created() {
    await users.fetchUser();
    this.user = Object.assign({}, users!.user);
  }

  private async updateUserSettings() {
    this.errors = {
      email: "",
      username: ""
    };
    users
      .modifyUser(this.user)
      .then(() => {
        this.$router.push("/@" + this.user!.username);
      })
      .catch((error) => {
        this.validateFormInputParameters(error.response.data.errors);
      });
  }

  private validateFormInputParameters(errors: any): void {
    if (errors.email) {
      this.errors.email = "Email " + errors.email.join(" & ");
    }
    if (errors.username) {
      this.errors.username = "Username " + errors.username.join(" & ");
    }
  }

  private async signoutUser() {
    await users.logoutUser();
    this.$router.push("/");
  }
}
</script>

<style scoped>
fieldset {
  margin-bottom: 16px !important;
}

.first-fieldset {
  margin-top: 36px !important;
}

hr {
  margin-top: 80px;
}

.error-text {
  margin-bottom: 0 !important;
}
</style>
