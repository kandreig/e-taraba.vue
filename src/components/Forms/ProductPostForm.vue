<template>
  <form class="modal-form-wrapper">
    <div class="product-form">
      <h2 class="product-form__title">Post product</h2>
      <div class="product-form__field">
        <BaseTextarea
          v-model="product.Name"
          label="Name"
          id="textarea-name"
          :errsMsg="errors.textarea_name"
        ></BaseTextarea>
      </div>
      <div class="product-form__field">
        <BaseTextarea
          v-model="product.Description"
          label="Description"
          id="textarea-description"
          rows="10"
          :errsMsg="errors.textarea_description"
        ></BaseTextarea>
      </div>

      <div class="product-form__field">
        <BaseInput
          v-model="product.Quantity"
          id="input-number-quantity"
          label="Quantity"
          type="number"
          :errsMsg="errors.input_quantity"
        ></BaseInput>
      </div>

      <div class="product-form__field">
        <BaseInputFileImage
          v-model="product.Image"
          label="Select image"
          id="product-image"
          :errsMsg="errors.input_image"
        ></BaseInputFileImage>
      </div>
      <div class="product-form__field">
        <BaseInput
          v-model="product.Price"
          type="Number"
          id="input-number-price"
          label="Price"
          :errsMsg="errors.input_price"
        ></BaseInput>
      </div>

      <div class="product-form__button-wrapper">
        <button
          @click.prevent="createProduct"
          class="product-form__button product-form__button--post"
        >
          Post
        </button>
        <button
          @click="$emit('close')"
          class="product-form__button product-form__button--cancel"
        >
          Cancel
        </button>
      </div>

      <pre>{{ product }}</pre>
    </div>
  </form>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import { useProductStore } from "@/stores/productStore";
import BaseTextarea from "@/components/BaseFormComponents/BaseTextarea.vue";
import BaseInput from "@/components/BaseFormComponents/BaseInput.vue";
import BaseInputFileImage from "@/components/BaseFormComponents/BaseInputFileImage.vue";

export default {
  components: { BaseTextarea, BaseInput, BaseInputFileImage },
  name: "PostForm",
  data() {
    return {
      product: {
        Name: "",
        Description: "",
        Quantity: 0,
        Image: null,
        Price: "",
      },
      url: "https://localhost:44379/images/" + ".jpg",
      errors: {
        textarea_name: [],
        textarea_description: [],
        input_quantity: [],
        input_image: [],
        input_price: [],
      },
    };
  },
  setup() {
    const userStore = useUserStore();
    const productStore = useProductStore();
    return { userStore, productStore };
  },
  methods: {
    createProduct() {
      this.resetErrors();

      if (this.validateInput()) {
        return;
      }

      this.productStore.createProduct(this.product);
      this.$emit("close");
    },
    validateInput() {
      let error = false;
      //textarea name -- max 100 chars, not null
      if (this.product.Name === "") {
        error = true;
        this.errors.textarea_name.push("Name field must not be empty");
      }
      if (this.product.Name.length > 100) {
        error = true;
        this.errors.textarea_name.push(
          `Name field must not be bigger than 100 characters. ${this.product.Name.length}/100`
        );
      }
      if (this.product.Description === "") {
        error = true;
        this.errors.textarea_description.push("Name field must not be empty");
      }
      if (this.product.Description.length > 255) {
        error = true;
        this.errors.textarea_description.push(
          `Name field must not be bigger than 255 characters. ${this.product.Description.length}/255`
        );
      }
      if (this.product.Quantity === "" || this.product.Quantity === 0) {
        error = true;
        this.errors.input_quantity.push(
          "Must give a quantity OR Invalid format. Correct format : integer"
        );
      }
      if (this.product.Quantity > 500 || this.product.Quantity < 1) {
        error = true;
        this.errors.input_quantity.push(
          "Quantity must not be greater than 500 and smaller than 1"
        );
      }

      if (this.product.Image == null) {
        error = true;
        this.errors.input_image.push("please select a valid image");
      }

      if (this.product.Price === "" || this.product.Price === 0) {
        error = true;
        this.errors.input_price.push(
          "Must give a quantity OR Invalid format. Correct format : integer"
        );
      }
      if (this.product.Price > 999999 || this.product.Price < 1) {
        error = true;
        this.errors.input_price.push(
          "Quantity must not be greater than 999999 and smaller than 1"
        );
      }
      return error;
      //textarea description - max 255 chars, not null
      //input quantity - integer not null
      //photo is handled by base input file image, not null
      //price - integer not null
    },
    resetErrors() {
      this.errors.textarea_name = [];
      this.errors.textarea_description = [];
      this.errors.input_quantity = [];
      this.errors.input_image = [];
      this.errors.input_price = [];
    },
  },
};
</script>

<style>
.product-form {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  padding: 30px;
  background: white;
  max-width: 500px;
  margin: 2rem auto;
}

.product-form__field {
  display: inline-flex;
  flex-direction: column;
  margin-block: 1em;
}

.product-form__field label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #666666;
}

.product-form__field input,
.product-form__field textarea {
  font-size: 1.1rem;
}
.product-form__field img {
  max-width: 200px;
  max-height: 200px;
}
.product-form__field input[type="number"] {
  align-self: flex-start;
  text-align: center;
}
.product-form__field input[type="file"] {
  font-size: 1rem;
}
.product-form__button {
  width: 70px;
  border: none;
  border-radius: 3px;
  align-self: flex-start;
  padding-inline: auto;
  padding-block: 2px;

  margin-block: 10px;
  margin-right: 10px;
  font-size: 1rem;
  color: white;
}
.product-form__button--post {
  background-color: limegreen;
}
.product-form__button--cancel {
  background-color: red;
}
</style>
