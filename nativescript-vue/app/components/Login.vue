<template>
  <Page>
    <StackLayout>
      <Label text="user: test , pass: 123123" textWrap="true" />
      <Button text="auto login" @tap="login" />
    </StackLayout>
  </Page>
</template>

<script>
import List from './List';
import { request } from "tns-core-modules/http";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as ApplicationSettings from "tns-core-modules/application-settings";

export default {
  data() {
    return {
      user: {
        identifier: "test",
        password: "123123",
      },
    };
  },
  methods: {
    login() {
      // clear token to prevent errors (if malformed)
      ApplicationSettings.remove("token");
      ApplicationSettings.remove("userID");
      ApplicationSettings.remove("userData");

      request({
        url: "https://polar-badlands-01357.herokuapp.com/auth/local",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
          identifier: this.user.identifier,
          password: this.user.password,
        }),
      })
        .then(
          (response) => {
            const result = response.content.toJSON();
            ApplicationSettings.setString("token", result.jwt);
            console.log("JWT from Server: ", result.jwt);

            ApplicationSettings.setNumber("userID", result.user.id);
            // userData object to string
            ApplicationSettings.setString("userData", JSON.stringify(result.user));
          },
          (e) => {
            console.error("auth/local error :", e);
            dialogs
              .alert({
                title: "ERROR",
                message: "LOGIN ERROR.",
                okButtonText: "OK",
              })
              .then(() => {
                console.warn("Alert dialog closed.");
              });
          }
        )
        .then(() => {
          this.$navigateTo(List);
        });
    },
  },
};
</script>
