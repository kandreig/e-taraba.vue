import { defineStore } from "pinia";
import axiosService from "../services/axiosApi";

export const useUserStore = defineStore("userStore", {
  state() {
    return {
      loggedIn: false,
      flashMessage: "",
    };
  },
  getters: {},
  actions: {
    login(userCredentials) {
      return axiosService
        .login(userCredentials)
        .then((response) => {
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
          localStorage.setItem("name", response.data.user.username);

          // console.log("acces token: " + localStorage.getItem("access_token"));
          // console.log("name of user: " + localStorage.getItem("name"));
          // console.log(
          // "refresh token: " + localStorage.getItem("refresh_token")
          // );
        })
        .catch((error) => {
          throw error;
        });
    },
    check_token() {
      return axiosService
        .check_accesstoken()
        .then(() => {
          // console.log("Access token is good");
          this.loggedIn = true;
        })
        .catch((error) => {
          //access token has expired or is invalid => issue new access token
          this.loggedIn = false;
          this.refresh_token();
          throw error;
        });
    },
    refresh_token() {
      return axiosService
        .refresh_token()
        .then((response) => {
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
          localStorage.setItem("name", response.data.username);
        })
        .catch((error) => {
          this.flashMessage = "Please login again";
          setTimeout(() => {
            this.flashMessage = "";
          }, 3000);
          localStorage.clear();
          throw error;
        });
    },
  },
});
