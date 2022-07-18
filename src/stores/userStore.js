import { defineStore } from "pinia";
import axiosService from "../services/axiosApi";

export const useUserStore = defineStore("userStore", {
  state() {
    return {
      accessToken: null,
      username: null,
    };
  },
  getters: {
    loggedIn() {
      return !!this.accessToken;
    },
  },
  actions: {
    login(userCredentials) {
      return axiosService
        .login(userCredentials)
        .then((response) => {
          this.accessToken = response.data.access_token;
          localStorage.setItem("refresh_token", response.data.refresh_token);
          this.username = response.data.user.username;
          console.log("acces token: " + this.accessToken);
          console.log("username: " + this.username);
          console.log(
            "refresh token: " + localStorage.getItem("refresh_token")
          );
        })
        .catch((error) => {
          throw error;
        });
    },
    refresh_token() {
      return axiosService
        .refresh_token()
        .then((response) => {
          this.accessToken = response.data.access_token;
          localStorage.setItem("refresh_token", response.data.refresh_token);
          this.username = response.data.username;
        })
        .catch((error) => {
          throw error;
        });
    },
  },
});
