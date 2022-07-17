<template>
  <form>
    <div class="inner">
      <div class="content name">
        <h3>NAME</h3>
        <textarea
          v-model="itemName"
          name=""
          id=""
          cols="30"
          rows="3"
        ></textarea>
      </div>

      <div class="content description">
        <h3>DESCRIPTION</h3>
        <textarea
          v-model="itemDescription"
          name=""
          id=""
          cols="30"
          rows="3"
        ></textarea>
      </div>
      <div class="content quantity">
        <h3>QUANTITY</h3>
        <input v-model="itemQuantity" type="number" name="" id="" />
      </div>
      <div class="content photo">
        <h3>PHOTO</h3>
        <img class="square" src="itemPhotoId" alt="" />
        <button @click="addPicture">Add pic</button>
      </div>
      <div class="content photo__id">
        <h3>PHOTO ID</h3>
        <p>{{ itemPhotoId }}</p>
      </div>
      <div class="content path">
        <h3>PHOTO PAHT</h3>
        <p>{{ itemPhotoPath }}</p>
        <input type="file" name="" id="" @change="consolefiles" />
      </div>
      <div class="content price">
        <h3>PRICE</h3>
        <input v-model="itemPrice" type="number" name="" id="" />
      </div>
      <button @click="sendData" class="content card__put">Post || Put</button>
    </div>
  </form>
</template>

<script>
export default {
  name: "PostForm",
  data() {
    return {
      itemName: null,
      itemDescription: null,
      itemQuantity: null,
      itemPhotoId: null,
      itemPhotoPath: null,
      itemPrice: null,
    };
  },
  methods: {
    addPicture() {},
    sendData() {
      this.$emit("close");
    },
    consolefiles(e) {
      console.log(e.target.files[0]);
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
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 10px;
  background: white;
  max-width: 500px;
  margin: 2rem auto;
}
</style>
