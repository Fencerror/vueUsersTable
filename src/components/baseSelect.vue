<template>
  <div :class="{'w-full': fullWidth}">
    <select
      :value="modelValue"
      @change="updateValue"
      :class="[
        'border rounded px-3 py-2 w-full',
        {'border-red-500': hasError},
        'focus:outline-none focus:ring-2 focus:ring-blue-400'
      ]"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <p v-if="hasError && errorMessage" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface SelectOption {
  label: string;
  value: string;
}

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  options: {
    type: Array as () => SelectOption[],
    required: true
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
  emit('update:modelValue', (event.target as HTMLSelectElement).value);
};
</script>

<style scoped>

</style>