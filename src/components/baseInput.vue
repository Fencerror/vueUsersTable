<template>
  <div :class="{'w-full': fullWidth}">
    <input
      :type="type"
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
      class="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm transition-colors duration-200"
      :class="{
        'border-red-500 focus:border-red-500 focus:ring-red-500': hasError,
        'border-gray-300 focus:border-blue-500 focus:ring-blue-500': !hasError
      }"
    />
    <p v-if="hasError && errorMessage" class="mt-1 text-xs text-red-600 min-h-[20px]">{{ errorMessage }}</p>
    <p v-else class="mt-1 text-xs text-transparent min-h-[20px] select-none">.</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>