<template>
  <form>
    <div class="inner">
      <strong @click="$emit('close')">X</strong>
      <div class="content name">
        <BaseTextarea
          v-model="product.Name"
          label="Numele produsului"
          id="textarea-name"
        ></BaseTextarea>
      </div>
      <div class="content description">
        <BaseTextarea
          v-model="product.Description"
          label="Descrierea produsului"
          id="textarea-description"
        ></BaseTextarea>
      </div>

      <div class="content quantity">
        <BaseInput
          v-model="product.Quantity"
          id="input-number-quantity"
          label="enter number of items"
          type="number"
        ></BaseInput>
      </div>

      <div class="content photo">
        <BaseInputFileImage
          v-model="product.Image"
          label="Insert Product Image"
          id="product-image"
        ></BaseInputFileImage>
      </div>
      <div class="content price">
        <BaseInput
          v-model="product.Price"
          type="Number"
          id="input-number-price"
          label="Price of product"
        ></BaseInput>
      </div>

      <button
        v-if="type == 'post'"
        @click="createProduct"
        class="content card__put"
      >
        Post
      </button>
      <button
        v-if="type == 'put'"
        @click="updateProduct"
        class="content card__put"
      >
        Put
      </button>
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
  props: {
    type: String,
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
      url: "https://localhost:44379/images/" + this.card.photoId + ".jpg",
    };
  },
  setup() {
    const userStore = useUserStore();
    const productStore = useProductStore();
    return { userStore, productStore };
  },
  methods: {
    createProduct() {
      // this.product.PhotoId = uuidv4();
      // this.product.PhotoFolderPath = "d://";

      let formData = new FormData();
      formData.append("Name", this.product.Name);
      formData.append("Description", this.product.Description);
      formData.append("Quantity", this.product.Quantity);
      formData.append("Image", this.product.Image);
      // formData.append("PhotoId", this.product.PhotoId);
      // formData.append("PhotoFolderPath", this.product.PhotoFolderPath);
      formData.append("Price", this.product.Price);

      this.productStore.createProduct(formData, this.userStore.accessToken);
      this.$emit("close");
    },
    updateProduct() {
      console.log(this.product);
      this.productStore.updateCard(
        this.card.id,
        this.userStore.accessToken,
        this.product
      );
      this.$emit("close");
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
