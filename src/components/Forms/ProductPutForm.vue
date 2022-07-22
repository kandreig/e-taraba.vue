<template>
  <form class="modal-form-wrapper">
    <div class="product-form">
      <strong @click="$emit('close')">X</strong>
      <h2 class="product-form__title">Update product</h2>
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
        <label>Old image of Product</label>
        <img class="product__old-image" :src="old_image" alt="" />
      </div>
      <div class="product-form__field">
        <BaseInputFileImage
          v-model="product.Image"
          label="New product image"
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

      <button @click.prevent="updateProduct" class="content card__put">
        Put
      </button>
      <pre>{{ product }}</pre>
      <pre>{{ card }}</pre>
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
  props: {
    card: Object,
  },
  data() {
    return {
      product: {
        Name: this.card.name,
        Description: this.card.description,
        Quantity: this.card.quantity,
        Image: null,
        Price: this.card.price,
      },
      old_image: "https://localhost:44379/images/" + this.card.photoId + ".jpg",
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
    updateProduct() {
      const PRODUCT_OBJECT_TO_UPDATE = {
        id: this.card.id,
        name: this.product.Name,
        description: this.product.Description,
        quantity: this.product.Quantity,
        image: this.product.Image,
        price: this.product.Price,
      };

      this.resetErrors();
      const returned = this.validateInput();
      console.log(returned);
      if (returned.error) {
        return;
      }
      if (!returned.changed) {
        this.$emit("close");
        return;
      }
      this.productStore.updateProduct(PRODUCT_OBJECT_TO_UPDATE);
      this.$emit("close");
    },
    validateInput() {
      let oldObject = this.card;
      let newObject = this.product;
      let changed = false;
      let error = false;
      //textarea name -- max 100 chars, not null
      const MAX_NAME_LENGTH = 100;
      const MAX_DESCRIPTION_LENGTH = 255;
      const MAX_QUANTITY = 500;
      const MIN_QUANTITY = 1;
      const MIN_PRICE = 1;
      const MAX_PRICE = 999999;

      if (newObject.Name !== oldObject.name) {
        const CURRENT_NAME_LENGTH = newObject.Name.length;
        changed = true;
        if (newObject.Name === "") {
          error = true;
          this.errors.textarea_name.push("Name field must not be empty");
        }
        if (newObject.Name.length > MAX_NAME_LENGTH) {
          error = true;
          this.errors.textarea_name.push(
            `Name field must not be bigger than ${MAX_NAME_LENGTH} characters. ${CURRENT_NAME_LENGTH}/100`
          );
        }
      }

      if (newObject.Description !== oldObject.description) {
        const CURRENT_DESCRIPTION_LENGTH = newObject.Description.length;
        changed = true;
        if (newObject.Description === "") {
          error = true;
          this.errors.textarea_description.push("Name field must not be empty");
        }
        if (newObject.Description.length > MAX_DESCRIPTION_LENGTH) {
          error = true;
          this.errors.textarea_description.push(
            `Name field must not be bigger than ${MAX_DESCRIPTION_LENGTH} characters. ${CURRENT_DESCRIPTION_LENGTH}/255`
          );
        }
      }

      if (newObject.Quantity !== oldObject.quantity) {
        changed = true;
        if (newObject.Quantity === "" || newObject.Quantity === 0) {
          error = true;
          this.errors.input_quantity.push(
            "Must give a quantity OR Invalid format. Correct format : integer"
          );
        }
        if (
          newObject.Quantity > MAX_QUANTITY ||
          newObject.Quantity < MIN_QUANTITY
        ) {
          error = true;
          this.errors.input_quantity.push(
            `Quantity must not be greater than ${MAX_QUANTITY} and smaller than ${MIN_QUANTITY}`
          );
        }
      }

      if (newObject.Image == null) {
        this.errors.input_image.push("no image selected, old image used");
      } else {
        changed = true;
      }

      if (newObject.Price !== oldObject.price) {
        changed = true;
        if (newObject.Price === "" || newObject.Price === 0) {
          error = true;
          this.errors.input_price.push(
            "Must give a quantity OR Invalid format. Correct format : integer"
          );
        }
        if (newObject.Price > MAX_PRICE || newObject.Price < MIN_PRICE) {
          error = true;
          this.errors.input_price.push(
            `Quantity must not be greater than ${MAX_PRICE} and smaller than ${MIN_PRICE}`
          );
        }
      }
      const r = { error: error, changed: changed };
      return r;
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

<style scoped>
.content:nth-child(odd) {
  background-color: #dddd;
}
.content > * {
  vertical-align: middle;
  display: inline-block;
}
.content {
  margin-block: 5px;
}

.scroll {
  line-height: 1.3rem;
  height: 3.9rem;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 5px;
  margin-bottom: 5px;
  box-shadow: 1px 1px 3px 1px #333;
}

.right__side > * {
  width: 100%;
  display: block;
}

.db__search {
  width: 20%;
}

.search__button {
  width: 5%;
}

img.square {
  aspect-ratio: 1/1;
  object-fit: cover;
  width: 100px;
}

button {
  border: none;
  display: inline-block;
}

.card__put {
  background-color: lightblue !important;
}
.card__delete {
  background-color: rgb(253, 72, 72) !important;
}

textarea {
  display: block !important;
}

form {
  width: 400px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}
*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.inner {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  padding: 10px;
  background: white;
  max-width: 500px;
  margin: 2rem auto;
}
strong {
  color: red;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  margin: 10px;
}
.inner input {
  margin-inline: 10px;
}
</style>
