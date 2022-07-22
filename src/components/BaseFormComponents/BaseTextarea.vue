<template>
  <label :for="id">{{ label }}</label>
  <textarea
    :class="[!!errsMsg.length ? 'border-red' : '']"
    v-bind="$attrs"
    :placeholder="label"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :id="id"
    :cols="cols"
    :rows="rows"
  ></textarea>
  <em class="error" v-for="(error, index) in errsMsg" :key="index">{{
    error
  }}</em>
</template>

<script>
export default {
  name: "BaseTextarea",
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      required: true,
    },
    cols: {
      type: [String, Number],
      default: 30,
    },
    rows: {
      type: [String, Number],
      default: 1,
    },
    errsMsg: {
      type: Array,
    },
  },
};
</script>

<style></style>
