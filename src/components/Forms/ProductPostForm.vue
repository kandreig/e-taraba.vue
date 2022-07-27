<template>
  <form class="modal-form-wrapper">
    <div class="form">
      <h2 class="form__title">Post product</h2>
      <div class="form__field">
        <BaseTextarea
          v-model="product.Name"
          label="Name"
          id="textarea-name"
          :errsMsg="errors.textarea_name"
        ></BaseTextarea>
      </div>
      <div class="form__field">
        <BaseTextarea
          v-model="product.Description"
          label="Description"
          id="textarea-description"
          rows="10"
          :errsMsg="errors.textarea_description"
        ></BaseTextarea>
      </div>

      <div class="form__field">
        <BaseInput
          v-model="product.Quantity"
          id="input-number-quantity"
          label="Quantity"
          type="number"
          :errsMsg="errors.input_quantity"
        ></BaseInput>
      </div>

      <div class="form__field form__field__input-image">
        <BaseInputFileImage
          v-model="product.Image"
          label="Click here to insert image"
          id="image"
          :errsMsg="errors.input_image"
        ></BaseInputFileImage>
      </div>
      <div class="form__field">
        <BaseInput
          v-model="product.Price"
          type="Number"
          id="input-number-price"
          label="Price"
          :errsMsg="errors.input_price"
        ></BaseInput>
      </div>

      <div class="form__button-wrapper">
        <button
          @click.prevent="createProduct"
          class="form__button form__button--post"
        >
          Post
        </button>
        <button
          @click="$emit('close')"
          class="form__button form__button--cancel"
        >
          Cancel
        </button>
      </div>
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
      const MAX_LENGTH_NAME = 100;
      const MAX_LENGTH_DESC = 5000;
      const MAX_SIZE_QUANTITY = 50;
      const MAX_SIZE_PRICE = 100000;
      //textarea name -- max 100 chars, not null
      if (this.product.Name === "") {
        error = true;
        this.errors.textarea_name.push("Name field must not be empty");
      }
      if (this.product.Name.length > MAX_LENGTH_NAME) {
        error = true;
        this.errors.textarea_name.push(
          `Name field must not be bigger than 100 characters. ${this.product.Name.length}/100`
        );
      }
      if (this.product.Description === "") {
        error = true;
        this.errors.textarea_description.push("Name field must not be empty");
      }
      if (this.product.Description.length > MAX_LENGTH_DESC) {
        error = true;
        this.errors.textarea_description.push(
          `Name field must not be bigger than ${MAX_LENGTH_DESC} characters. ${this.product.Description.length}/${MAX_LENGTH_DESC}`
        );
      }
      if (this.product.Quantity === "" || this.product.Quantity === 0) {
        error = true;
        this.errors.input_quantity.push(
          "Must give a quantity OR Invalid format. Correct format : integer"
        );
      }
      if (
        this.product.Quantity > MAX_SIZE_QUANTITY ||
        this.product.Quantity < 1
      ) {
        error = true;
        this.errors.input_quantity.push(
          `Quantity must not be greater than ${MAX_SIZE_QUANTITY} and smaller than 1`
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
      if (this.product.Price > MAX_SIZE_PRICE || this.product.Price < 1) {
        error = true;
        this.errors.input_price.push(
          `Quantity must not be greater than ${MAX_SIZE_PRICE} and smaller than 1`
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
