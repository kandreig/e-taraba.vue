<template>
  <form>
    <div class="inner">
      <strong @click="$emit('close')">X</strong>
      <div class="content name">
        <h3>NAME</h3>
        <textarea
          v-model="product.Name"
          name=""
          id=""
          cols="30"
          rows="3"
        ></textarea>
      </div>
      <div class="content description">
        <h3>DESCRIPTION</h3>
        <textarea
          v-model="product.Description"
          name=""
          id=""
          cols="30"
          rows="3"
        ></textarea>
      </div>
      <div class="content quantity">
        <h3>QUANTITY</h3>
        <input v-model="product.Quantity" type="number" name="" id="" />
      </div>
      <div class="content photo">
        <h3>PHOTO</h3>
        <img class="square" :src="url" />
        <input type="file" name="" id="" @change="file" />
      </div>
      <div class="content price">
        <h3>PRICE</h3>
        <input v-model="product.Price" type="number" name="" id="" />
      </div>
      <button @click="sendData" class="content card__put">Post || Put</button>
    </div>
  </form>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import { useProductStore } from "@/stores/productStore";

export default {
  name: "PostForm",
  data() {
    return {
      product: {
        Name: null,
        Description: null,
        Quantity: null,
        Image: null,
        Price: null,
      },
      url: null,
    };
  },
  setup() {
    const userStore = useUserStore();
    const productStore = useProductStore();
    return { userStore, productStore };
  },
  methods: {
    sendData() {
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

    file(e) {
      let file = e.target.files[0];

      if (!file || file.type.indexOf("image/") !== 0) {
        alert("not image, file empty");
        return;
      }
      let fileSizeInMb = file.size / 1048576;

      if (fileSizeInMb > 1) {
        alert("image to big, must be smaller than 2mb");
        return;
      }
      this.url = URL.createObjectURL(file);
      this.product.Image = file;

      // let reader = new FileReader();

      // reader.readAsDataURL(file);
      // reader.onload = (evt) => {
      //   let img = new Image();
      //   img.onload = () => {
      //     if (
      //       img.width > 500 ||
      //       img.heigth > 500 ||
      //       img.width < 150 ||
      //       img.height < 150
      //     ) {
      //       alert(
      //         "image size not optimal, please resize between 200x200 - 500x500"
      //       );
      //     } else {
      //       this.url = URL.createObjectURL(file);
      //       this.product.Image = file;
      //     }
      //     // alert("width:" + img.width);
      //     // alert("heigth:" + img.height);
      //   };
      //   img.src = evt.target.result;
      // };

      // reader.onerror = (evt) => {
      //   console.error(evt);
      // };
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
