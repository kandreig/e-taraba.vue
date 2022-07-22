<template>
  <label :for="id">{{ label }}</label>
  <img :src="url" />
  <input type="file" :id="id" @change="previewImage" accept="image/*" />
  <em class="error" v-for="(error, index) in errsMsg" :key="index">{{
    error
  }}</em>
  <em class="error">{{ errMsg }}</em>
</template>

<script>
export default {
  name: "BaseInputFileImage",
  props: {
    label: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Object,
      default: null,
    },
    maxSize: {
      type: Number,
      default: 2,
    },
    errsMsg: {
      type: Array,
    },
  },
  data() {
    return {
      url: "",
      errMsg: "",
    };
  },
  methods: {
    previewImage(event) {
      let file = event.target.files[0];

      if (!file || file.type.indexOf("image/") !== 0) {
        this.errMsg = "file is not image, please select an image file";

        return;
      }
      let fileSizeInMb = file.size / 1048576;

      if (fileSizeInMb > this.maxSize) {
        this.errMsg = `image file too big, must be smaller than ${this.maxSize}mb`;
        return;
      }
      this.url = URL.createObjectURL(file);

      this.$emit("update:modelValue", event.target.files[0]);

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
