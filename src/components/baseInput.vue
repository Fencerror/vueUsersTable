<template>
  <div :class="{'w-full': fullWidth}">
    <input
      :type="type"
      :value="modelValue"
      @input="updateValue"
      :placeholder="placeholder"
      :class="[
        'border rounded px-3 py-2 w-full',
        {'border-red-500': hasError}, 
        'focus:outline-none focus:ring-2 focus:ring-blue-400' 
      ]"
    />
    <p v-if="hasError && errorMessage" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  hasError: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  },
  fullWidth: { 
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>

<style scoped>

</style>