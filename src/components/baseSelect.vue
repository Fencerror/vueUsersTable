<template>
  <div :class="{'w-full': fullWidth}">
    <select
      :value="modelValue"
      @change="updateValue"
      :class="[
        'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm transition-colors duration-200 bg-white',
        {'border-red-500 focus:border-red-500 focus:ring-red-500': hasError},
        {'border-gray-300 focus:border-blue-500 focus:ring-blue-500': !hasError}
      ]"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <p v-if="hasError && errorMessage" class="text-red-600 text-xs mt-1 min-h-[20px]">{{ errorMessage }}</p>
    <p v-else class="text-transparent text-xs mt-1 min-h-[20px] select-none">.</p>
  </div>
</template>

<script setup lang="ts">
interface SelectOption {
  label: string;
  value: string;
}

defineProps({
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