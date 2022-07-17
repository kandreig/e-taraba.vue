<template>
  <div class="db__card">
    <div class="content id">
      <h3>ID</h3>
      <p>1</p>
    </div>
    <div class="content name">
      <h3>NAME</h3>
      <p class="scroll">
        {{ itemName }}
      </p>
    </div>
    <div class="content photo">
      <h3>PHOTO</h3>
      <img class="square" src="photoPath" alt="" />
    </div>
    <div class="content description">
      <h3>DESCRIPTION</h3>
      <p class="scroll">
        {{ itemDescription }}
      </p>
    </div>
    <div class="content quantity">
      <h3>QUANTITY</h3>
      <p>{{ itemQuantityInDatabase }} <i>pcs</i></p>
    </div>
    <div class="content photo__id">
      <h3>PHOTO ID</h3>
      <p>{{ photoId }}</p>
    </div>
    <div class="content path">
      <h3>PHOTO PAHT</h3>
      <p>{{ photosDefaultPath }}</p>
    </div>
    <div class="content price">
      <h3>PRICE</h3>
      <p>{{ itemPrice }}<i>$</i></p>
    </div>
    <button class="content card__put" @click="$emit('put-item')">PUT</button>
    <button class="content card__delete">DELETE</button>
  </div>
</template>

<script>
export default {
  name: "AdminProductCard",
};
</script>

<style>
.db__card {
  min-width: 350px;
  width: 50%;
  display: flex;
  padding: 5px;
  margin-block: 10px;
  flex-direction: column;
  background-color: #fafafa;
}
.left__side {
  width: 70%;
}
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
img.square {
  aspect-ratio: 1/1;
  object-fit: cover;
  width: 100px;
}
.card__put {
  background-color: lightblue !important;
}
.card__delete {
  background-color: rgb(253, 72, 72) !important;
}
</style>
<style scoped>
button {
  border: none;
  display: inline-block;
}
textarea {
  display: block !important;
}
</style>
