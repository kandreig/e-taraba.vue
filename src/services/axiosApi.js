import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:44379",
});

export default {
  login(userCredentials) {
    return apiClient.post("/api/authentication", userCredentials);
  },
  check_accesstoken() {
    return apiClient.post("/api/authentication/check-atoken", null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  },
  post_product(formData_product) {
    return apiClient.post("/api/products", formData_product, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
  get_products() {
    return apiClient.get("/api/products");
  },
  get_product_by_id(id) {
    return apiClient.get(`/api/products/${id}`);
  },
  get_products_with_price_filter(minPrice, maxPrice) {
    return apiClient.get(
      `/api/products?PriceMin=${minPrice}&PriceMax=${maxPrice}`
    );
  },
  get_products_with_search_query(searchQuery) {
    return apiClient.get(`/api/products?SearchQuery=${searchQuery}`);
  },
  delete_product(id) {
    return apiClient.delete(`/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  },
  update_product(id, form_data) {
    return apiClient.putForm(`/api/products/${id}`, form_data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  },
  get_orders() {
    return apiClient.get("/api/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  },
  get_products_for_orderId(idOrder) {
    return apiClient.get(`/api/products/order/${idOrder}`);
  },
  get_productorder_details_for_orderId(idOrder) {
    return apiClient.get(`/api/productorder/order/${idOrder}`);
  },
  post_order(orderToPost) {
    return apiClient.post("/api/orders", orderToPost);
  },
  post_productOrderDetails(productOrderDetailsToPost) {
    return apiClient.post("/api/productorder", productOrderDetailsToPost);
  },
};
