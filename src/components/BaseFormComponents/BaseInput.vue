<template>
  <label for="id">{{ label }}</label>
  <input
    :class="[!!errsMsg.length ? 'border-red' : '']"
    v-bind="$attrs"
    :placeholder="label"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :id="id"
  />
  <em class="error" v-for="(error, index) in errsMsg" :key="index">{{
    error
  }}</em>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    id: {
      type: String,
      required: true,
    },
    errsMsg: {
      type: Array,
    },
  },
};
</script>
