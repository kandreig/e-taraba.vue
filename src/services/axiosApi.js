import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:44379",
});

export default {
  login(userCredentials) {
    return apiClient.post("/api/authentication", userCredentials);
  },
  post_product(product, access_token) {
    return apiClient.post("/api/products", product, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  },
  refresh_token() {
    return apiClient.post(
      "/api/authentication/refresh-token",
      localStorage.getItem("refresh_token"),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },
};
