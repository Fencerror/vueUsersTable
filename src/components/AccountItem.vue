<template>
  <div class="grid grid-cols-[1.5fr,1fr,1.5fr,1.5fr,0.5fr] gap-4 items-start p-4 hover:bg-gray-50 transition-colors duration-200">

    <BaseInput
      v-model="labelsString"
      placeholder="Метки"
      :fullWidth="true"
      :hasError="!!validationErrors.labels"
      :errorMessage="validationErrors.labels || ''"
    />

    <BaseSelect
      v-model="internalAccount.type"
      :options="accountTypeOptions"
      :fullWidth="true"
      :hasError="!!validationErrors.type"
      :errorMessage="validationErrors.type || ''"
    />

    <div class="relative w-full">
      <BaseInput
        v-model="internalAccount.login"
        placeholder="Логин"
        :fullWidth="true"
        :hasError="!!validationErrors.login"
        :errorMessage="validationErrors.login || ''"
      />
    </div>

    <div class="relative w-full">
      <BaseInput
        v-if="internalAccount.type === 'Локальная'"
        :type="passwordFieldType"
        v-model="passwordValue"
        placeholder="Пароль"
        :fullWidth="true"
        :hasError="!!validationErrors.password"
        :errorMessage="validationErrors.password || ''"
      />
      <button
        v-if="internalAccount.type === 'Локальная'"
        @click="togglePasswordVisibility"
        class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-800 h-10"
        type="button"
        aria-label="Показать/скрыть пароль"
      >
      </button>
    </div>

    <div class="flex justify-center items-start h-full">
        <button
          @click="emit('delete', account.id)"
          class="text-gray-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
          aria-label="Удалить запись"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.176H8.927a2.25 2.25 0 01-2.244-2.176L4.24 6.456m18.04-3.212l-3.21-.803A.75.75 0 0018.75 3H5.25a.75.75 0 00-.745.501l-3.21.803M12 3c-1.846 0-3.543.63-4.943 1.688M12 3c1.846 0 3.543.63 4.943 1.688" />
            </svg>
        </button>
    </div>

  </div>
</template>

<script setup lang="ts">

import type { Account } from '../types/account';
import { validateLabel, validateLogin, validatePassword } from '../utils/validation';
import BaseInput from './baseInput.vue';
import BaseSelect from './baseSelect.vue';
import { ref, watch, reactive, computed } from 'vue';


const props = defineProps<{
  account: Account;
}>();

const emit = defineEmits(['update', 'delete']);


interface ValidationErrors {
  labels: string | null;
  type: string | null;
  login: string | null;
  password: string | null;
}

const accountTypeOptions = [
  { label: 'Локальная', value: 'Локальная' },
  { label: 'LDAP', value: 'LDAP' },
];

const internalAccount = reactive<Omit<Account, 'labels'>>({
  id: props.account.id,
  type: props.account.type,
  login: props.account.login,
  password: props.account.password,
});

const labelsString = ref(props.account.labels.map(l => l.text).join(';'));

const passwordFieldType = ref('password');

const validationErrors = reactive<ValidationErrors>({
  labels: null,
  type: null,
  login: null,
  password: null,
});


const passwordValue = computed({
  get: () => internalAccount.password === null ? '' : internalAccount.password,
  set: (value: string) => {
    internalAccount.password = value;
  }
});


const togglePasswordVisibility = () => {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
};


const validateFields = () => {
  validationErrors.labels = validateLabel(labelsString.value);
  validationErrors.login = validateLogin(internalAccount.login);
  validationErrors.password = validatePassword(internalAccount.password, internalAccount.type);
  return !Object.values(validationErrors).some(error => error !== null);
};


const emitUpdate = () => {
  const updatedAccount: Account = {
    ...internalAccount,
    labels: labelsString.value.split(';').filter((text: string) => Boolean(text.trim())).map((text: string) => ({ text: text.trim() })),
  };

  if (updatedAccount.type === 'LDAP') {
    updatedAccount.password = null;
  }

  emit('update', updatedAccount);
};


const DEBOUNCE_DELAY = 500;
let updateTimeout: ReturnType<typeof setTimeout> | null = null;

const validateAndEmitUpdate = () => {
  if (updateTimeout) {
    clearTimeout(updateTimeout);
  }
  updateTimeout = setTimeout(() => {
    if (validateFields()) {
      emitUpdate();
    }
  }, DEBOUNCE_DELAY);
};


watch(() => internalAccount.type, (newType) => {
    if (newType === 'LDAP') {
        internalAccount.password = null;
        passwordFieldType.value = 'password';
        validationErrors.password = null;
    } else if (newType === 'Локальная') {
        if (internalAccount.password === null) {
            internalAccount.password = '';
        }
    }
});


watch([internalAccount, labelsString], () => {
  validateAndEmitUpdate();
}, { deep: true });


watch(() => props.account, (newVal) => {
  const newLabelsStr = newVal.labels.map(l => l.text).join(';');
  Object.assign(internalAccount, newVal);
  labelsString.value = newLabelsStr;
  validateFields();
}, { deep: true });

</script>