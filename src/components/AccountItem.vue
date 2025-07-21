<template>
  <div class="grid grid-cols-[1.5fr,1fr,1.5fr,1.5fr,0.5fr] gap-4 items-start py-2 border-b border-gray-200">
    <BaseInput
      v-model="labelsString"
      placeholder="Метки"
      :fullWidth="true"
    />

    <BaseSelect
      v-model="internalAccount.type"
      :options="accountTypeOptions"
      @change="handleTypeChange"
      :fullWidth="true"
    />

    <BaseInput
      v-model="internalAccount.login"
      placeholder="Логин"
      :fullWidth="true"
    />

    <div class="relative w-full">
      <BaseInput
        v-if="internalAccount.type === 'Локальная'"
        :type="passwordFieldType"
        v-model="passwordValue"
        placeholder="Пароль"
        :fullWidth="true"
      />
      <button
        v-if="internalAccount.type === 'Локальная'"
        @click="togglePasswordVisibility"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        <span v-if="passwordFieldType === 'password'">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </span>
        <span v-else>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.981 18.75A7.498 7.498 0 0112 15.75a7.498 7.498 0 017.019 2.997V21a4.5 4.5 0 00-2.36-4.085A7.498 7.498 0 0112 15.75c-1.353 0-2.653.242-3.86.685A4.5 4.5 0 005.36 21v-2.25zM12 12a3 3 0 100-6 3 3 0 000 6z" />
          </svg>
        </span>
      </button>
    </div>

    <button @click="emit('delete', account.id)" class="text-gray-400 hover:text-red-500 justify-self-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.176H8.927a2.25 2.25 0 01-2.244-2.176L4.24 6.456m18.04-3.212l-3.21-.803A.75.75 0 0018.75 3H5.25a.75.75 0 00-.745.501l-3.21.803m20.5 0a48.711 48.711 0 00-6.21 0m-2.22 0a48.711 48.711 0 00-6.21 0" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, computed } from 'vue'; 
import type { Account, Label } from '../types/account';
import BaseInput from './baseInput.vue';
import BaseSelect from './baseSelect.vue';

const props = defineProps<{
  account: Account;
}>();

const emit = defineEmits(['update', 'delete']);

const internalAccount = reactive<Omit<Account, 'labels'>>({
  id: props.account.id,
  type: props.account.type,
  login: props.account.login,
  password: props.account.password,
});


const labelsString = ref(props.account.labels.map(l => l.text).join(';'));

const passwordValue = computed({
  get: () => internalAccount.password === null ? '' : internalAccount.password,
  set: (value: string) => {
    internalAccount.password = value;
  }
});


const passwordFieldType = ref('password'); 

const accountTypeOptions = [
  { label: 'Локальная', value: 'Локальная' },
  { label: 'LDAP', value: 'LDAP' },
];

const togglePasswordVisibility = () => {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
};


const handleTypeChange = (value: string) => {
  internalAccount.type = value as 'Локальная' | 'LDAP';
  if (internalAccount.type === 'LDAP') {
    internalAccount.password = null; 
  } else {
    internalAccount.password = ''; 
  }
  emitUpdate(); 
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

watch([internalAccount, labelsString], () => {
  emitUpdate();
}, { deep: true });

watch(() => props.account, (newVal) => {
  if (newVal.id !== internalAccount.id) {
    Object.assign(internalAccount, {
      id: newVal.id,
      type: newVal.type,
      login: newVal.login,
      password: newVal.password,
    });
    labelsString.value = newVal.labels.map(l => l.text).join(';');
  }
}, { deep: true });
</script>
