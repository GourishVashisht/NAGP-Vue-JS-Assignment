<template>
  <div class="settings settings-page" v-if="user">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h2 class="text-xs-center">Your Settings</h2>

          <form>
            <fieldset>
              <fieldset class="form-group">
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
                @click="updateUserSettings()"
              >Update Settings</button>
            </fieldset>
          </form>
          <hr />
          <button @click="signoutUser()" class="btn btn-outline-danger">Or click here to logout.</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import users from "@/store/modules/UserModule";

@Component
export default class Settings extends Vue {
  get user() {
    return users.user;
  }

  private async updateUserSettings() {
    await users.modifyUser(this.user);
    this.$router.push("/@" + this.user.username);
  }

  private async signoutUser() {
    await users.logoutUser();
    this.$router.push("/");
  }
}
</script>

<style scoped>
.settings {
  margin-top: 60px;
}
</style>
